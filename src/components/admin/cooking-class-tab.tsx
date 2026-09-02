import { useState } from "react";
import { Save, Plus, Trash2, Utensils, Image as ImageIcon } from "lucide-react";
import { CmsContextValue } from "@/lib/cms-store";
import { ImageUploader, BulkImageUploader } from "@/components/ui/device-media-uploader";

export function CookingClassCrudTab({
  cmsStore,
  showToast,
}: {
  cmsStore: CmsContextValue;
  showToast: (m: string) => void;
}) {
  const data = cmsStore.cms.cookingClass || {
    heroTitle: "Cooking Class — Pembekalan Kuliner Jerman",
    heroSubtitle:
      "Program persiapan memasak masakan khas Jerman bagi calon peserta Ausbildung, Au Pair, dan FSJ.",
    description:
      "Di Jerman, kemandirian memasak dan memahami budaya kuliner lokal seperti Kartoffelsalat, Schnitzel, dan Bratwurst adalah nilai plus saat tinggal bersama keluarga asuh maupun hidup mandiri.",
    points: [
      {
        id: "cook-1",
        title: "Praktik Resep Asli Jerman",
        desc: "Belajar memasak resep autentik Jerman mulai dari hidangan utama hingga kue khas Eropa.",
      },
      {
        id: "cook-2",
        title: "Kosa Kata Dapur & Memasak",
        desc: "Mengenal istilah kuliner bahasa Jerman (Kochen, Braten, Backen, Zutaten) secara langsung.",
      },
      {
        id: "cook-3",
        title: "Table Manner & Etika Makan",
        desc: "Memahami budaya makan formal dan kasual yang berlaku di Jerman dan negara Eropa.",
      },
    ],
    photos: [
      {
        id: "cp-1",
        src: "/logo.png",
        alt: "Sesi Cooking Class 1",
        caption: "Praktik memasak masakan khas bersama pengajar lulusan Jerman",
      },
      {
        id: "cp-2",
        src: "/logo.png",
        alt: "Sesi Cooking Class 2",
        caption: "Pengenalan bumbu dan alat dapur khas Jerman",
      },
    ],
  };

  const [formData, setFormData] = useState(data);

  const handleSave = () => {
    cmsStore.updateSection("cookingClass", formData);
    showToast("Halaman Cooking Class berhasil disimpan!");
  };

  const addPoint = () => {
    setFormData({
      ...formData,
      points: [
        ...formData.points,
        {
          id: `cook-${Date.now()}`,
          title: "Materi Baru",
          desc: "Deskripsi materi pembekalan kuliner...",
        },
      ],
    });
  };

  const removePoint = (id: string) => {
    setFormData({
      ...formData,
      points: formData.points.filter((p) => p.id !== id),
    });
  };

  const addPhoto = () => {
    setFormData({
      ...formData,
      photos: [
        ...formData.photos,
        {
          id: `cp-${Date.now()}`,
          src: "/logo.png",
          alt: "Foto Cooking Class Baru",
          caption: "Keterangan foto kegiatan...",
        },
      ],
    });
  };

  const handleBulkAdd = (uploaded: { imgUrl: string; title: string }[]) => {
    const newItems = uploaded.map((item, idx) => ({
      id: `cp-${Date.now()}-${idx}`,
      src: item.imgUrl,
      alt: item.title || "Dokumentasi Cooking Class",
      caption: "Praktik memasak masakan Jerman bersama siswa ILD",
    }));
    setFormData({
      ...formData,
      photos: [...(formData.photos || []), ...newItems],
    });
    showToast(`${uploaded.length} foto cooking class ditambahkan!`);
  };

  const removePhoto = (id: string) => {
    setFormData({
      ...formData,
      photos: formData.photos.filter((p) => p.id !== id),
    });
  };

  return (
    <div className="space-y-6 animate-fade-in w-full">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Halaman Cooking Class & Kuliner Jerman
          </h2>
          <p className="text-xs text-slate-500">
            Kelola judul, deskripsi filosofi, daftar materi pembekalan, dan galeri foto cooking
            class.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-2.5 text-xs font-bold text-white hover:bg-sky-600 transition-all shadow-sm shadow-sky-500/20"
        >
          <Save className="h-4 w-4" />
          <span>Simpan Cooking Class</span>
        </button>
      </div>

      {/* Hero Headline & Desc */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900">Headline & Deskripsi Utama</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Judul Hero</label>
            <input
              type="text"
              value={formData.heroTitle || ""}
              onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Subtitle</label>
            <input
              type="text"
              value={formData.heroSubtitle || ""}
              onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Deskripsi Pengantar
          </label>
          <textarea
            rows={3}
            value={formData.description || ""}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-3 text-xs text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      {/* Points & Materials */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Utensils className="h-4 w-4 text-sky-600" />
            <span>Materi Pembekalan Kuliner Jerman</span>
          </h3>
          <button
            onClick={addPoint}
            className="inline-flex items-center gap-1 rounded-xl bg-sky-50 border border-sky-200 px-3 py-1.5 text-xs font-bold text-sky-700 hover:bg-sky-100"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Tambah Poin Materi</span>
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {formData.points?.map((pt, idx) => (
            <div
              key={pt.id || idx}
              className="rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-sky-700 font-mono">
                  Poin #{idx + 1}
                </span>
                <button
                  onClick={() => removePoint(pt.id)}
                  className="text-rose-500 hover:text-rose-700 p-1"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <input
                type="text"
                value={pt.title}
                onChange={(e) => {
                  const copy = [...formData.points];
                  copy[idx].title = e.target.value;
                  setFormData({ ...formData, points: copy });
                }}
                className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-bold text-slate-900 focus:outline-none"
              />
              <textarea
                rows={2}
                value={pt.desc}
                onChange={(e) => {
                  const copy = [...formData.points];
                  copy[idx].desc = e.target.value;
                  setFormData({ ...formData, points: copy });
                }}
                className="w-full rounded-lg border border-slate-200 bg-white p-2 text-xs text-slate-600 focus:outline-none"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Photos Grid */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <ImageIcon className="h-4 w-4 text-sky-600" />
            <span>Dokumentasi Foto Cooking Class</span>
          </h3>
          <button
            onClick={addPhoto}
            className="inline-flex items-center gap-1 rounded-xl bg-sky-50 border border-sky-200 px-3 py-1.5 text-xs font-bold text-sky-700 hover:bg-sky-100"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Tambah Foto</span>
          </button>
        </div>

        {/* Bulk uploader */}
        <BulkImageUploader onAddPhotos={handleBulkAdd} defaultCategory="Cooking Class" />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {formData.photos?.map((ph, idx) => (
            <div
              key={ph.id || idx}
              className="rounded-xl border border-slate-200 bg-white overflow-hidden p-3.5 space-y-3 shadow-2xs"
            >
              <ImageUploader
                label={`Foto #${idx + 1}`}
                value={ph.src}
                onChange={(url) => {
                  const copy = [...formData.photos];
                  copy[idx].src = url;
                  setFormData({ ...formData, photos: copy });
                }}
                aspectRatio="wide"
                placeholderText="Pilih Foto dari Perangkat"
              />
              <input
                type="text"
                value={ph.caption}
                onChange={(e) => {
                  const copy = [...formData.photos];
                  copy[idx].caption = e.target.value;
                  setFormData({ ...formData, photos: copy });
                }}
                placeholder="Caption / keterangan foto..."
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none"
              />
              <div className="flex justify-end pt-1">
                <button
                  onClick={() => removePhoto(ph.id)}
                  className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 font-semibold"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Hapus Foto</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
