import { useState } from "react";
import { Save, Plus, Trash2, Layers } from "lucide-react";
import { CmsContextValue } from "@/lib/cms-store";

export function StrukturCrudTab({
  cmsStore,
  showToast,
}: {
  cmsStore: CmsContextValue;
  showToast: (m: string) => void;
}) {
  const struktur = cmsStore.cms.struktur;
  const [formData, setFormData] = useState({ ...struktur });

  const handleSave = () => {
    cmsStore.updateSection("struktur", formData);
    showToast("Halaman Struktur Organisasi berhasil disimpan!");
  };

  const addDivision = () => {
    setFormData({
      ...formData,
      divisions: [
        ...(formData.divisions || []),
        {
          name: "Divisi / Bagian Baru",
          lead: "Nama Pimpinan",
          tasks: "Tugas dan tanggung jawab operasional divisi...",
        },
      ],
    });
  };

  const removeDivision = (idx: number) => {
    const divisions = [...formData.divisions];
    divisions.splice(idx, 1);
    setFormData({ ...formData, divisions });
  };

  return (
    <div className="space-y-6 animate-fade-in w-full">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Halaman Struktur Organisasi & Dewan Pengurus
          </h2>
          <p className="text-xs text-slate-500">
            Kelola bagan susunan kepengurusan, Dewan Pembina, Direktur Utama, dan Kepala Divisi.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-2.5 text-xs font-bold text-white hover:bg-sky-600 transition-all shadow-sm shadow-sky-500/20"
        >
          <Save className="h-4 w-4" />
          <span>Simpan Struktur</span>
        </button>
      </div>

      {/* Hero Headline */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900">Headline Halaman Struktur</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Judul Hero</label>
            <input
              type="text"
              value={formData.heroTitle || ""}
              onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs text-slate-900 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Subjudul Hero</label>
            <input
              type="text"
              value={formData.heroSubtitle || ""}
              onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs text-slate-900 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Divisions & Leads */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Layers className="h-4 w-4 text-sky-600" />
            <span>Susunan Divisi & Tanggung Jawab</span>
          </h3>
          <button
            onClick={addDivision}
            className="inline-flex items-center gap-1 rounded-xl bg-sky-50 border border-sky-200 px-3 py-1.5 text-xs font-bold text-sky-700 hover:bg-sky-100"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Tambah Divisi</span>
          </button>
        </div>

        <div className="space-y-3">
          {formData.divisions?.map((div, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sky-700 font-mono">
                  Posisi / Divisi #{idx + 1}
                </span>
                <button
                  onClick={() => removeDivision(idx)}
                  className="text-rose-500 hover:text-rose-700 p-1"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Nama Divisi / Jabatan
                  </label>
                  <input
                    type="text"
                    value={div.name}
                    onChange={(e) => {
                      const divisions = [...formData.divisions];
                      divisions[idx].name = e.target.value;
                      setFormData({ ...formData, divisions });
                    }}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Nama Pejabat / Pimpinan
                  </label>
                  <input
                    type="text"
                    value={div.lead}
                    onChange={(e) => {
                      const divisions = [...formData.divisions];
                      divisions[idx].lead = e.target.value;
                      setFormData({ ...formData, divisions });
                    }}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-sky-700 font-semibold focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Deskripsi Tanggung Jawab
                </label>
                <textarea
                  rows={2}
                  value={div.tasks}
                  onChange={(e) => {
                    const divisions = [...formData.divisions];
                    divisions[idx].tasks = e.target.value;
                    setFormData({ ...formData, divisions });
                  }}
                  className="w-full rounded-lg border border-slate-200 bg-white p-2 text-xs text-slate-700 focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
