import { useState } from "react";
import { Save, Plus, Trash2, Video, ExternalLink } from "lucide-react";
import { CmsContextValue, VideoDocumentationItem } from "@/lib/cms-store";
import { VideoUploader } from "@/components/ui/device-media-uploader";

export function VideoCrudTab({
  cmsStore,
  showToast,
}: {
  cmsStore: CmsContextValue;
  showToast: (m: string) => void;
}) {
  const videos = cmsStore.cms.video.videos || [];
  const [newTitle, setNewTitle] = useState("");
  const [newVideoSrc, setNewVideoSrc] = useState("");
  const [newCategory, setNewCategory] = useState("Alumni");
  const [newDuration, setNewDuration] = useState("04:30");
  const [newDesc, setNewDesc] = useState("");

  const handleAddVideo = () => {
    if (!newTitle.trim() || !newVideoSrc.trim()) {
      showToast("Judul dan File Video / YouTube ID wajib diisi!");
      return;
    }
    cmsStore.addVideo({
      id: `vid-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      youtubeId: newVideoSrc.trim(),
      duration: newDuration.trim() || "Video",
      description: newDesc.trim(),
    });
    showToast("Video baru berhasil ditambahkan!");
    setNewTitle("");
    setNewVideoSrc("");
    setNewDesc("");
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Hapus video ini dari galeri?")) {
      cmsStore.deleteVideo(id);
      showToast("Video berhasil dihapus!");
    }
  };

  const isDirectVideo = (src: string) => {
    return (
      src.startsWith("data:video") ||
      src.startsWith("blob:") ||
      src.endsWith(".mp4") ||
      src.endsWith(".webm") ||
      src.includes("/")
    );
  };

  return (
    <div className="space-y-6 animate-fade-in w-full">
      <div className="border-b border-slate-200 pb-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Galeri Video & Testimoni Siswa / Alumni
          </h2>
          <p className="text-xs text-slate-500">
            Unggah video langsung dari perangkat Anda (MP4/WebM) atau sematkan video dari YouTube
            ID/Link.
          </p>
        </div>
      </div>

      {/* Add video form */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Plus className="h-4 w-4 text-sky-600" />
          <span>Tambah Video Dokumentasi Baru</span>
        </h3>

        <div className="grid gap-3 sm:grid-cols-3">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Judul Video (cth: Cerita Pengalaman Ausbildung di Jerman)"
            className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs text-slate-900 focus:outline-none"
          />
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Kategori (cth: Testimoni / Kelas / Vlog / Alumni)"
            className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs text-slate-900 focus:outline-none"
          />
          <input
            type="text"
            value={newDuration}
            onChange={(e) => setNewDuration(e.target.value)}
            placeholder="Durasi (cth: 04:30)"
            className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs text-slate-900 focus:outline-none"
          />
        </div>

        {/* Device Video Uploader Component */}
        <VideoUploader
          label="Sumber Video (Upload File dari HP/Laptop atau Masukkan YouTube Link)"
          value={newVideoSrc}
          onChange={setNewVideoSrc}
          helperText="Mendukung upload file MP4 / WebM langsung dari perangkat atau input ID / Link YouTube."
        />

        <div className="flex gap-2">
          <input
            type="text"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="Keterangan singkat isi video..."
            className="flex-1 rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs text-slate-900 focus:outline-none"
          />
          <button
            onClick={handleAddVideo}
            className="rounded-xl bg-sky-500 px-5 py-2 text-xs font-bold text-white hover:bg-sky-600 shrink-0"
          >
            Simpan Video
          </button>
        </div>
      </div>

      {/* Videos List Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((vid: VideoDocumentationItem, idx: number) => {
          const isDirect = isDirectVideo(vid.youtubeId);
          return (
            <div
              key={vid.id || idx}
              className="rounded-2xl border border-slate-200 bg-white overflow-hidden flex flex-col justify-between shadow-xs"
            >
              <div className="relative aspect-video bg-slate-900 overflow-hidden">
                {isDirect ? (
                  <video src={vid.youtubeId} controls className="h-full w-full object-cover" />
                ) : (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${vid.youtubeId}`}
                    title={vid.title}
                    className="h-full w-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
                <span className="absolute top-2 left-2 rounded-md bg-black/80 px-2 py-0.5 text-[10px] font-bold text-white shadow-xs pointer-events-none">
                  {vid.category}
                </span>
                <span className="absolute bottom-2 right-2 rounded-md bg-black/80 px-1.5 py-0.5 text-[10px] font-mono text-white pointer-events-none">
                  {vid.duration}
                </span>
              </div>

              <div className="p-4 space-y-1.5 flex-1">
                <h4 className="text-sm font-bold text-slate-900 line-clamp-2">{vid.title}</h4>
                <p className="text-xs text-slate-500 line-clamp-2">{vid.description}</p>
              </div>

              <div className="p-3 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                {!isDirect && (
                  <a
                    href={`https://youtube.com/watch?v=${vid.youtubeId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-bold text-sky-600 hover:underline inline-flex items-center gap-1"
                  >
                    <span>Buka YouTube</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
                {isDirect && (
                  <span className="text-[11px] font-semibold text-emerald-600">
                    Video Uploaded File
                  </span>
                )}
                <button
                  onClick={() => handleDelete(vid.id)}
                  className="p-1 text-rose-600 hover:text-rose-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
