import { useState } from "react";
import { Save, Plus, Trash2, HeartHandshake, CheckCircle } from "lucide-react";
import { CmsContextValue } from "@/lib/cms-store";

export function AupairCrudTab({
  cmsStore,
  showToast,
}: {
  cmsStore: CmsContextValue;
  showToast: (m: string) => void;
}) {
  const aupair = cmsStore.cms.programAupair;
  const [formData, setFormData] = useState({ ...aupair });

  const handleSave = () => {
    cmsStore.updateSection("programAupair", formData);
    showToast("Program Au Pair berhasil disimpan!");
  };

  const addBenefit = () => {
    setFormData({
      ...formData,
      benefits: [...(formData.benefits || []), "Benefit baru bagi Au Pair..."],
    });
  };

  const removeBenefit = (idx: number) => {
    const benefits = [...(formData.benefits || [])];
    benefits.splice(idx, 1);
    setFormData({ ...formData, benefits });
  };

  const addReq = () => {
    setFormData({
      ...formData,
      requirements: [...(formData.requirements || []), "Syarat baru Au Pair..."],
    });
  };

  const removeReq = (idx: number) => {
    const requirements = [...(formData.requirements || [])];
    requirements.splice(idx, 1);
    setFormData({ ...formData, requirements });
  };

  return (
    <div className="space-y-6 animate-fade-in w-full">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Halaman Program Au Pair (Gastfamilie)
          </h2>
          <p className="text-xs text-slate-500">
            Kelola judul program, info uang saku bulanan, syarat usia 18-26 tahun, dan fasilitas
            keluarga asuh.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-2.5 text-xs font-bold text-white hover:bg-sky-600 transition-all shadow-sm shadow-sky-500/20"
        >
          <Save className="h-4 w-4" />
          <span>Simpan Au Pair</span>
        </button>
      </div>

      {/* Hero Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900">Headline & Badge Program Au Pair</h3>
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
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Badge Uang Saku (Taschengeld)
            </label>
            <input
              type="text"
              value={formData.pocketMoneyBadge || ""}
              onChange={(e) => setFormData({ ...formData, pocketMoneyBadge: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs text-slate-900 focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Subjudul / Deskripsi Program
          </label>
          <textarea
            rows={3}
            value={formData.heroSubtitle || ""}
            onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-3 text-xs text-slate-900 focus:outline-none"
          />
        </div>
      </div>

      {/* Benefits & Requirements */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Benefits */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <HeartHandshake className="h-4 w-4 text-sky-600" />
              <span>Fasilitas & Keuntungan (Benefits)</span>
            </h3>
            <button
              onClick={addBenefit}
              className="inline-flex items-center gap-1 rounded-xl bg-sky-50 border border-sky-200 px-3 py-1 text-xs font-bold text-sky-700 hover:bg-sky-100"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Tambah Benefit</span>
            </button>
          </div>

          <div className="space-y-2">
            {(formData.benefits || []).map((b: string, idx: number) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={b}
                  onChange={(e) => {
                    const benefits = [...formData.benefits];
                    benefits[idx] = e.target.value;
                    setFormData({ ...formData, benefits });
                  }}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-1.5 text-xs text-slate-900 focus:outline-none"
                />
                <button
                  onClick={() => removeBenefit(idx)}
                  className="text-rose-500 hover:text-rose-700 p-1 shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-600" />
              <span>Syarat & Kualifikasi Au Pair</span>
            </h3>
            <button
              onClick={addReq}
              className="inline-flex items-center gap-1 rounded-xl bg-sky-50 border border-sky-200 px-3 py-1 text-xs font-bold text-sky-700 hover:bg-sky-100"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Tambah Syarat</span>
            </button>
          </div>

          <div className="space-y-2">
            {(formData.requirements || []).map((r: string, idx: number) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={r}
                  onChange={(e) => {
                    const requirements = [...formData.requirements];
                    requirements[idx] = e.target.value;
                    setFormData({ ...formData, requirements });
                  }}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-1.5 text-xs text-slate-900 focus:outline-none"
                />
                <button
                  onClick={() => removeReq(idx)}
                  className="text-rose-500 hover:text-rose-700 p-1 shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
