import { useState } from "react";
import { Save, Plus, Trash2, Sparkles, Image as ImageIcon } from "lucide-react";
import { CmsContextValue } from "@/lib/cms-store";
import { ImageUploader, BulkImageUploader } from "@/components/ui/device-media-uploader";

export function GatheringCrudTab({
  cmsStore,
  showToast,
}: {
  cmsStore: CmsContextValue;
  showToast: (m: string) => void;
}) {
  const data = cmsStore.cms.gathering || {
    heroTitle: "Gathering & Pembinaan Mental Siswa",
    heroSubtitle:
      "Membangun kekompakan, ketahanan mental, dan jaringan pertemanan antar alumni sebelum berangkat ke Jerman.",
    description:
      "Perjalanan studi dan karir di Jerman membutuhkan kesiapan mental yang tangguh. Acara gathering rutin ILD Medan memfasilitasi sharing session bersama alumni yang telah sukses di Jerman.",
    values: [
      {
        id: "gv-1",
        title: "Ketahanan Mental & Kemandirian",
        desc: "Diskusi terbuka mengenai culture shock dan cara mengatasi homesick di negara 4 musim.",
      },
      {
        id: "gv-2",
        title: "Jejaring Alumni Se-Indonesia",
        desc: "Koneksi dengan sesama siswa yang akan tinggal di kota yang sama di berbagai Bundesländer.",
      },
      {
        id: "gv-3",
        title: "Motivasi & Doa Bersama",
        desc: "Pemberian wejangan dari para pembina dan doa restu sebelum keberangkatan ke Jakarta/Jerman.",
      },
    ],
    photos: [
      {
        id: "gp-1",
        src: "/logo.png",
        alt: "Gathering Siswa Angkatan 2024",
        caption: "Sesi keakraban dan sharing alumni di alam terbuka",
      },
      {
        id: "gp-2",
        src: "/logo.png",
        alt: "Pelepasan Calon Siswa Ausbildung",
        caption: "Foto bersama seluruh instruktur dan peserta sebelum terbang",
      },
    ],
  };

  const [formData, setFormData] = useState(data);

  const handleSave = () => {
    cmsStore.updateSection("gathering", formData);
    showToast("Halaman Gathering berhasil disimpan!");
  };

  const addValue = () => {
    setFormData({
      ...formData,
      values: [
        ...formData.values,
        {
          id: `gv-${Date.now()}`,
          title: "Nilai Pembinaan Baru",
          desc: "Deskripsi pembinaan karakter...",
        },
      ],
    });
  };

  const removeValue = (id: string) => {
    setFormData({
      ...formData,
      values: formData.values.filter((v) => v.id !== id),
    });
  };

  const addPhoto = () => {
    setFormData({
      ...formData,
      photos: [
        ...formData.photos,
        {
          id: `gp-${Date.now()}`,
          src: "/logo.png",
          alt: "Foto Gathering Baru",
          caption: "Keterangan foto kegiatan...",
        },
      ],
    });
  };

  const handleBulkAdd = (uploaded: { imgUrl: string; title: string }[]) => {
    const newItems = uploaded.map((item, idx) => ({
      id: `gp-${Date.now()}-${idx}`,
      src: item.imgUrl,
      alt: item.title || "Dokumentasi Gathering",
      caption: "Dokumentasi keakraban dan pembinaan karakter siswa ILD",
    }));
    setFormData({
      ...formData,
      photos: [...(formData.photos || []), ...newItems],
    });
    showToast(`${uploaded.length} foto gathering berhasil ditambahkan!`);
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
            Halaman Gathering & Pembinaan Mental Siswa
          </h2>
          <p className="text-xs text-slate-500">
            Kelola judul hero, pengantar pembinaan mental dan karakter, nilai-nilai pembekalan,
            serta foto dokumentasi.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-2.5 text-xs font-bold text-white hover:bg-sky-600 transition-all shadow-sm shadow-sky-500/20"
        >
          <Save className="h-4 w-4" />
          <span>Simpan Gathering</span>
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

      {/* Values */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-sky-600" />
            <span>Fokus Pembinaan Karakter & Mental</span>
          </h3>
          <button
            onClick={addValue}
            className="inline-flex items-center gap-1 rounded-xl bg-sky-50 border border-sky-200 px-3 py-1.5 text-xs font-bold text-sky-700 hover:bg-sky-100"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Tambah Fokus Nilai</span>
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {formData.values?.map((val, idx) => (
            <div
              key={val.id || idx}
              className="rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-sky-700 font-mono">
                  Nilai #{idx + 1}
                </span>
                <button
                  onClick={() => removeValue(val.id)}
                  className="text-rose-500 hover:text-rose-700 p-1"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <input
                type="text"
                value={val.title}
                onChange={(e) => {
                  const copy = [...formData.values];
                  copy[idx].title = e.target.value;
                  setFormData({ ...formData, values: copy });
                }}
                className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-bold text-slate-900 focus:outline-none"
              />
              <textarea
                rows={2}
                value={val.desc}
                onChange={(e) => {
                  const copy = [...formData.values];
                  copy[idx].desc = e.target.value;
                  setFormData({ ...formData, values: copy });
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
            <span>Dokumentasi Foto Gathering Siswa</span>
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
        <BulkImageUploader onAddPhotos={handleBulkAdd} defaultCategory="Gathering" />

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
