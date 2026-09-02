import { useState } from "react";
import { Save, Plus, Trash2, BookOpen, Target, Heart } from "lucide-react";
import { CmsContextValue } from "@/lib/cms-store";

export function TentangKamiCrudTab({
  cmsStore,
  showToast,
}: {
  cmsStore: CmsContextValue;
  showToast: (m: string) => void;
}) {
  const tentang = cmsStore.cms.tentangKami;
  const [formData, setFormData] = useState({ ...tentang });

  const handleSave = () => {
    cmsStore.updateSection("tentangKami", formData);
    showToast("Halaman Tentang Kami berhasil disimpan!");
  };

  const addMission = () => {
    setFormData({
      ...formData,
      missions: [...(formData.missions || []), "Butir misi baru lembaga..."],
    });
  };

  const removeMission = (idx: number) => {
    const missions = [...formData.missions];
    missions.splice(idx, 1);
    setFormData({ ...formData, missions });
  };

  const addValue = () => {
    setFormData({
      ...formData,
      values: [
        ...(formData.values || []),
        { title: "Nilai Inti Baru", desc: "Deskripsi filosofi lembaga..." },
      ],
    });
  };

  const removeValue = (idx: number) => {
    const values = [...formData.values];
    values.splice(idx, 1);
    setFormData({ ...formData, values });
  };

  return (
    <div className="space-y-6 animate-fade-in w-full">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Halaman Tentang Kami & Visi Misi Lembaga
          </h2>
          <p className="text-xs text-slate-500">
            Kelola sejarah pendirian lembaga, visi jangka panjang, butir-butir misi, dan nilai-nilai
            integritas.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-2.5 text-xs font-bold text-white hover:bg-sky-600 transition-all shadow-sm shadow-sky-500/20"
        >
          <Save className="h-4 w-4" />
          <span>Simpan Profil</span>
        </button>
      </div>

      {/* Hero Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900">Headline Halaman Profil</h3>
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

      {/* Sejarah & Cerita */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-sky-600" />
          <span>Kisah & Sejarah Berdirinya Lembaga</span>
        </h3>
        <div className="space-y-3">
          {formData.story?.map((paragraph, idx) => (
            <div key={idx} className="space-y-1">
              <label className="block text-[11px] font-semibold text-slate-600">
                Paragraf #{idx + 1}
              </label>
              <textarea
                rows={3}
                value={paragraph}
                onChange={(e) => {
                  const story = [...formData.story];
                  story[idx] = e.target.value;
                  setFormData({ ...formData, story });
                }}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-3 text-xs text-slate-900 focus:outline-none"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Visi & Misi */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Visi */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Target className="h-4 w-4 text-sky-600" />
            <span>Visi Lembaga</span>
          </h3>
          <textarea
            rows={4}
            value={formData.vision || ""}
            onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-3 text-xs text-slate-900 focus:outline-none"
          />
        </div>

        {/* Misi */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Target className="h-4 w-4 text-sky-600" />
              <span>Butir-butir Misi</span>
            </h3>
            <button
              onClick={addMission}
              className="inline-flex items-center gap-1 rounded-xl bg-sky-50 border border-sky-200 px-3 py-1 text-xs font-bold text-sky-700 hover:bg-sky-100"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Tambah Misi</span>
            </button>
          </div>

          <div className="space-y-2">
            {formData.missions?.map((m, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={m}
                  onChange={(e) => {
                    const missions = [...formData.missions];
                    missions[idx] = e.target.value;
                    setFormData({ ...formData, missions });
                  }}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-1.5 text-xs text-slate-900 focus:outline-none"
                />
                <button
                  onClick={() => removeMission(idx)}
                  className="text-rose-500 hover:text-rose-700 p-1 shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Nilai-Nilai Inti */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Heart className="h-4 w-4 text-sky-600" />
            <span>Nilai-Nilai Inti Lembaga (Core Values)</span>
          </h3>
          <button
            onClick={addValue}
            className="inline-flex items-center gap-1 rounded-xl bg-sky-50 border border-sky-200 px-3 py-1 text-xs font-bold text-sky-700 hover:bg-sky-100"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Tambah Nilai</span>
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {formData.values?.map((val, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-sky-700 font-mono">
                  Nilai #{idx + 1}
                </span>
                <button
                  onClick={() => removeValue(idx)}
                  className="text-rose-500 hover:text-rose-700 p-1"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <input
                type="text"
                value={val.title}
                onChange={(e) => {
                  const values = [...formData.values];
                  values[idx].title = e.target.value;
                  setFormData({ ...formData, values });
                }}
                className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-slate-900 focus:outline-none"
              />
              <textarea
                rows={2}
                value={val.desc}
                onChange={(e) => {
                  const values = [...formData.values];
                  values[idx].desc = e.target.value;
                  setFormData({ ...formData, values });
                }}
                className="w-full rounded-lg border border-slate-200 bg-white p-2 text-xs text-slate-600 focus:outline-none"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
