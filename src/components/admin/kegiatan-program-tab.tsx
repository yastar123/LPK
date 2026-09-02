import { useState } from "react";
import { Save, Activity, ExternalLink } from "lucide-react";
import { CmsContextValue } from "@/lib/cms-store";
import { ImageUploader } from "@/components/ui/device-media-uploader";

export function KegiatanProgramCrudTab({
  cmsStore,
  showToast,
}: {
  cmsStore: CmsContextValue;
  showToast: (m: string) => void;
}) {
  const data = cmsStore.cms.kegiatanProgram || {
    heroTitle: "Kegiatan Program & Pembinaan Menuju Jerman",
    heroSubtitle:
      "Tiga pilar utama pembekalan siswa: Kursus Bahasa Intensif, Cooking Class Masakan Jerman, dan Gathering Mental Building.",
    description:
      "Setiap calon siswa di Ich Liebe Deutsch Medan mendapatkan pembekalan holistik yang mencakup aspek bahasa, keterampilan bertahan hidup (life skills), hingga kesiapan mental mandiri di Eropa.",
    pillars: [
      {
        id: "pil-1",
        title: "1. Kursus Bahasa Jerman Intensif",
        desc: "Pembelajaran berstandar Goethe-Institut dari level A1 hingga B2 dengan native approach dan simulasi ujian berkala.",
        image: "/logo.png",
        linkTo: "/kegiatan-belajar",
      },
      {
        id: "pil-2",
        title: "2. Cooking Class Kuliner Jerman",
        desc: "Praktik memasak menu harian khas Jerman agar siswa siap mandiri dan mudah beradaptasi dengan Gastfamilie.",
        image: "/logo.png",
        linkTo: "/cooking-class",
      },
      {
        id: "pil-3",
        title: "3. Gathering & Mental Building",
        desc: "Sesi motivasi, sharing alumni yang sudah sukses bekerja di Jerman, dan pembinaan karakter tahan banting.",
        image: "/logo.png",
        linkTo: "/gathering",
      },
    ],
  };

  const [formData, setFormData] = useState(data);

  const handleSave = () => {
    cmsStore.updateSection("kegiatanProgram", formData);
    showToast("Halaman Kegiatan Program berhasil disimpan!");
  };

  return (
    <div className="space-y-6 animate-fade-in w-full">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Halaman Kegiatan Program (3 Pilar Pembekalan)
          </h2>
          <p className="text-xs text-slate-500">
            Kelola judul hero, deskripsi pilar program pembekalan holistik, dan tautan rincian tiap
            pilar.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-2.5 text-xs font-bold text-white hover:bg-sky-600 transition-all shadow-sm shadow-sky-500/20"
        >
          <Save className="h-4 w-4" />
          <span>Simpan Kegiatan Program</span>
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

      {/* 3 Pillars */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Activity className="h-4 w-4 text-sky-600" />
          <span>3 Pilar Utama Program Persiapan</span>
        </h3>

        <div className="grid gap-4 md:grid-cols-3">
          {formData.pillars?.map((pil, idx) => (
            <div
              key={pil.id || idx}
              className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 space-y-3"
            >
              <ImageUploader
                label={`Foto Pilar #${idx + 1}`}
                value={pil.image}
                onChange={(url) => {
                  const copy = [...formData.pillars];
                  copy[idx].image = url;
                  setFormData({ ...formData, pillars: copy });
                }}
                aspectRatio="wide"
                placeholderText="Upload Foto Pilar dari HP/Laptop"
              />

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Nama Pilar
                </label>
                <input
                  type="text"
                  value={pil.title}
                  onChange={(e) => {
                    const copy = [...formData.pillars];
                    copy[idx].title = e.target.value;
                    setFormData({ ...formData, pillars: copy });
                  }}
                  className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Deskripsi
                </label>
                <textarea
                  rows={3}
                  value={pil.desc}
                  onChange={(e) => {
                    const copy = [...formData.pillars];
                    copy[idx].desc = e.target.value;
                    setFormData({ ...formData, pillars: copy });
                  }}
                  className="w-full rounded-lg border border-slate-200 bg-white p-2 text-xs text-slate-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Tautan URL
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={pil.linkTo}
                    onChange={(e) => {
                      const copy = [...formData.pillars];
                      copy[idx].linkTo = e.target.value;
                      setFormData({ ...formData, pillars: copy });
                    }}
                    className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs text-sky-700 font-mono focus:outline-none"
                  />
                  <a
                    href={pil.linkTo}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 text-slate-500 hover:text-sky-600"
                    title="Buka Halaman"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
