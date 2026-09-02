import React, { useRef, useState } from "react";
import {
  Upload,
  Image as ImageIcon,
  Video as VideoIcon,
  X,
  RefreshCw,
  Link as LinkIcon,
  CheckCircle2,
  FileUp,
} from "lucide-react";

/**
 * Utility: Compresses large image files to maximum width/height of 1600px with 0.85 JPEG quality
 * Returns base64 Data URL string.
 */
export async function compressAndReadFile(
  file: File,
  maxDim = 1600,
  quality = 0.85,
): Promise<string> {
  return new Promise((resolve, reject) => {
    // If SVG, just read as data URL directly
    if (file.type === "image/svg+xml") {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Use webp or jpeg for smaller storage footprint
        const mime = file.type === "image/png" ? "image/png" : "image/jpeg";
        const dataUrl = canvas.toDataURL(mime, quality);
        resolve(dataUrl);
      };
      img.onerror = () => resolve(e.target?.result as string);
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Utility: Read video file as Data URL / Object URL
 */
export async function readVideoFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* =========================================================================
   SINGLE IMAGE UPLOADER COMPONENT
   ========================================================================= */
export interface ImageUploaderProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  aspectRatio?: "square" | "video" | "wide" | "avatar" | "auto";
  placeholderText?: string;
  className?: string;
  helperText?: string;
  maxDimension?: number;
}

export function ImageUploader({
  label,
  value,
  onChange,
  aspectRatio = "wide",
  placeholderText = "Klik atau geser foto dari perangkat Anda (HP / Laptop)",
  className = "",
  helperText,
  maxDimension = 1600,
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith("image/")) {
      alert("Silakan pilih file gambar (JPG, PNG, WebP, SVG).");
      return;
    }

    try {
      setIsProcessing(true);
      const dataUrl = await compressAndReadFile(file, maxDimension);
      onChange(dataUrl);
    } catch (err) {
      console.error("Gagal membaca file gambar:", err);
      alert("Terjadi kesalahan saat memproses gambar.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const isBase64 = value?.startsWith("data:image/");
  const hasValue = Boolean(value && value.trim() !== "");

  const aspectClass =
    aspectRatio === "square"
      ? "aspect-square w-full max-w-[200px]"
      : aspectRatio === "avatar"
        ? "h-20 w-20 rounded-full"
        : aspectRatio === "video"
          ? "aspect-video w-full"
          : aspectRatio === "wide"
            ? "h-36 w-full"
            : "min-h-24 w-full";

  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between">
        {label && <label className="block text-xs font-semibold text-slate-700">{label}</label>}
        <button
          type="button"
          onClick={() => setShowUrlInput((prev) => !prev)}
          className="text-[11px] font-medium text-sky-600 hover:text-sky-700 hover:underline flex items-center gap-1 transition-colors"
        >
          <LinkIcon className="h-3 w-3" />
          <span>{showUrlInput ? "Sembunyikan URL" : "Gunakan Tautan URL"}</span>
        </button>
      </div>

      {showUrlInput && (
        <div className="flex items-center gap-2 mb-2 animate-fade-in">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Tempelkan tautan URL gambar (cth: https://... atau /logo.png)"
            className="flex-1 rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-sky-500"
          />
        </div>
      )}

      {/* Upload Dropzone / Preview */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`group relative overflow-hidden rounded-xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center p-3 text-center ${
          isDragging
            ? "border-sky-500 bg-sky-50/80 scale-[1.01]"
            : hasValue
              ? "border-slate-200 bg-slate-50/50 hover:border-sky-400 hover:bg-slate-100/60"
              : "border-slate-300 bg-slate-50/60 hover:border-sky-400 hover:bg-sky-50/40"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = "";
          }}
        />

        {isProcessing ? (
          <div className="py-6 flex flex-col items-center gap-2">
            <RefreshCw className="h-6 w-6 animate-spin text-sky-600" />
            <span className="text-xs font-semibold text-sky-700">
              Mengompres & memproses gambar...
            </span>
          </div>
        ) : hasValue ? (
          <div className="w-full flex flex-col items-center gap-2">
            <div
              className={`relative overflow-hidden border border-slate-200 bg-slate-900/5 ${aspectClass} ${
                aspectRatio === "avatar" ? "rounded-full" : "rounded-lg"
              }`}
            >
              <img
                src={value}
                alt="Uploaded preview"
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/logo.png";
                }}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <span className="rounded-lg bg-white/90 px-2.5 py-1 text-[11px] font-bold text-slate-800 shadow-xs flex items-center gap-1">
                  <FileUp className="h-3.5 w-3.5 text-sky-600" />
                  <span>Ganti Foto</span>
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between w-full px-1 text-[11px] text-slate-500">
              <span className="flex items-center gap-1 font-medium">
                {isBase64 ? (
                  <>
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    <span className="text-emerald-700 font-semibold">Foto dari Perangkat</span>
                  </>
                ) : (
                  <>
                    <ImageIcon className="h-3.5 w-3.5 text-sky-600" />
                    <span className="truncate max-w-[200px]">{value}</span>
                  </>
                )}
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange("");
                }}
                className="text-rose-600 hover:text-rose-700 font-semibold p-1 hover:bg-rose-50 rounded-md transition-colors"
                title="Hapus foto"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="py-4 px-2 flex flex-col items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 shadow-xs group-hover:scale-110 transition-transform">
              <Upload className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">{placeholderText}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">
                Mendukung JPG, PNG, WEBP, SVG • Klik untuk memilih file
              </p>
            </div>
          </div>
        )}
      </div>

      {helperText && <p className="text-[10px] text-slate-400">{helperText}</p>}
    </div>
  );
}

/* =========================================================================
   BULK / MULTI IMAGE UPLOADER COMPONENT (for Photo Galleries)
   ========================================================================= */
export interface BulkImageUploaderProps {
  onAddPhotos: (photos: { imgUrl: string; title: string; category?: string }[]) => void;
  defaultCategory?: string;
}

export function BulkImageUploader({
  onAddPhotos,
  defaultCategory = "Kelas",
}: BulkImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadCount, setUploadCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsProcessing(true);
    setUploadCount(files.length);

    try {
      const results: { imgUrl: string; title: string; category?: string }[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith("image/")) {
          const dataUrl = await compressAndReadFile(file, 1600);
          const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
          results.push({
            imgUrl: dataUrl,
            title: cleanName.charAt(0).toUpperCase() + cleanName.slice(1),
            category: defaultCategory,
          });
        }
      }

      if (results.length > 0) {
        onAddPhotos(results);
      }
    } catch (err) {
      console.error("Gagal upload multi foto:", err);
      alert("Terjadi kesalahan saat memproses foto.");
    } finally {
      setIsProcessing(false);
      setUploadCount(0);
    }
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setIsDragging(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
      onClick={() => fileInputRef.current?.click()}
      className={`rounded-2xl border-2 border-dashed p-6 text-center cursor-pointer transition-all ${
        isDragging
          ? "border-sky-500 bg-sky-50/80 scale-[1.01]"
          : "border-sky-200 bg-sky-50/40 hover:bg-sky-50/70 hover:border-sky-400"
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
      />

      {isProcessing ? (
        <div className="flex flex-col items-center gap-2">
          <RefreshCw className="h-7 w-7 animate-spin text-sky-600" />
          <p className="text-xs font-bold text-sky-800">
            Sedang mengunggah & mengompres {uploadCount} foto dari perangkat Anda...
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <div className="h-12 w-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-md shadow-sky-500/20">
            <Upload className="h-6 w-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Unggah Foto Langsung dari HP / Laptop (Bisa Pilih Banyak Sekaligus)
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Tarik file foto ke sini atau klik untuk membuka galeri perangkat
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   DEVICE VIDEO UPLOADER COMPONENT (for Video files or YouTube)
   ========================================================================= */
export interface VideoUploaderProps {
  label?: string;
  youtubeId?: string;
  videoUrl?: string;
  onYoutubeIdChange?: (id: string) => void;
  onVideoUrlChange?: (url: string) => void;
  className?: string;
}

export function VideoUploader({
  label = "Sumber Video (Upload File Perangkat atau Tautan YouTube)",
  youtubeId = "",
  videoUrl = "",
  onYoutubeIdChange,
  onVideoUrlChange,
  className = "",
}: VideoUploaderProps) {
  const [activeTab, setActiveTab] = useState<"upload" | "youtube">(videoUrl ? "upload" : "youtube");
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleVideoFile = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith("video/")) {
      alert("Silakan pilih file video (MP4, WebM, MOV, OGG).");
      return;
    }

    try {
      setIsProcessing(true);
      const dataUrl = await readVideoFile(file);
      if (onVideoUrlChange) onVideoUrlChange(dataUrl);
      setActiveTab("upload");
    } catch (err) {
      console.error("Gagal membaca video:", err);
      alert("Gagal membaca file video.");
    } finally {
      setIsProcessing(false);
    }
  };

  const extractYoutubeId = (raw: string) => {
    let id = raw.trim();
    if (id.includes("v=")) {
      id = id.split("v=")[1]?.split("&")[0] || id;
    } else if (id.includes("youtu.be/")) {
      id = id.split("youtu.be/")[1]?.split("?")[0] || id;
    }
    return id;
  };

  return (
    <div className={`space-y-3 rounded-2xl border border-slate-200 bg-white p-4 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
        <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
          <VideoIcon className="h-4 w-4 text-sky-600" />
          <span>{label}</span>
        </label>
        <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => setActiveTab("youtube")}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all ${
              activeTab === "youtube"
                ? "bg-white text-sky-700 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            YouTube Link / ID
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("upload")}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all ${
              activeTab === "upload"
                ? "bg-white text-sky-700 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Upload File Perangkat (MP4/WebM)
          </button>
        </div>
      </div>

      {activeTab === "youtube" ? (
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={youtubeId}
              onChange={(e) => {
                const cleanId = extractYoutubeId(e.target.value);
                if (onYoutubeIdChange) onYoutubeIdChange(cleanId);
              }}
              placeholder="Tempelkan link YouTube (cth: https://youtube.com/watch?v=... atau ID video)"
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-sky-500"
            />
          </div>
          {youtubeId && (
            <div className="aspect-video w-full max-w-sm rounded-xl overflow-hidden bg-slate-900 mt-2 border border-slate-200">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
                title="Preview Video"
                className="h-full w-full border-0"
                allowFullScreen
              />
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="video/mp4,video/webm,video/ogg,video/quicktime"
            className="hidden"
            onChange={(e) => {
              handleVideoFile(e.target.files);
              e.target.value = "";
            }}
          />

          {isProcessing ? (
            <div className="py-6 rounded-xl border border-dashed border-sky-300 bg-sky-50/60 flex flex-col items-center justify-center gap-2">
              <RefreshCw className="h-6 w-6 animate-spin text-sky-600" />
              <span className="text-xs font-semibold text-sky-700">
                Membaca file video dari perangkat...
              </span>
            </div>
          ) : videoUrl ? (
            <div className="space-y-2">
              <div className="aspect-video w-full max-w-md rounded-xl overflow-hidden bg-black border border-slate-200">
                <video src={videoUrl} controls className="h-full w-full object-cover" />
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>File video terunggah dari perangkat</span>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-sky-600 hover:text-sky-700 font-semibold text-[11px]"
                  >
                    Ganti Video
                  </button>
                  <button
                    type="button"
                    onClick={() => onVideoUrlChange && onVideoUrlChange("")}
                    className="text-rose-600 hover:text-rose-700 font-semibold text-[11px]"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="py-6 px-4 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/60 hover:bg-sky-50/40 hover:border-sky-400 cursor-pointer text-center flex flex-col items-center gap-2"
            >
              <div className="h-10 w-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
                <Upload className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">
                  Klik untuk Memilih File Video dari Perangkat (MP4, WebM, MOV)
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Dapat langsung diputar di pemutar video website
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
