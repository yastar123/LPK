import { useState } from "react";
import { Save, Plus, Trash2, FileCheck, CheckCircle, ArrowRight } from "lucide-react";
import { CmsContextValue } from "@/lib/cms-store";

export function PersyaratanCrudTab({
  cmsStore,
  showToast,
}: {
  cmsStore: CmsContextValue;
  showToast: (m: string) => void;
}) {
  const data = cmsStore.cms.persyaratan || {
    heroTitle: "Persyaratan & Dokumen Program ke Jerman",
    heroSubtitle:
      "Panduan lengkap syarat kualifikasi, dokumen yang perlu dipersiapkan, dan tahapan proses pengurusan visa.",
    programs: [
      {
        id: "req-ausbildung",
        programName: "Ausbildung (Sekolah Vokasi)",
        badge: "Usia 18 - 30 Tahun",
        requirements: [
          "Minimal lulusan SMA/SMK/MA/D3/S1 semua jurusan",
          "Sertifikat Bahasa Jerman Goethe-Zertifikat minimal level B1",
          "Usia 18 s.d. 30 tahun saat mendaftar",
          "Surat Izin Orang Tua / Wali bagi yang belum menikah",
          "Memiliki motivasi tinggi, komitmen belajar, dan disiplin tinggi",
          "Bebas dari catatan kriminal (SKCK) dan berbadan sehat",
        ],
      },
      {
        id: "req-aupair",
        programName: "Au Pair (Pertukaran Budaya)",
        badge: "Usia 18 - 26 Tahun",
        requirements: [
          "Minimal lulusan SMA/SMK sederajat",
          "Sertifikat Bahasa Jerman Goethe-Zertifikat minimal level A1",
          "Usia 18 s.d. 26 tahun saat pengajuan visa",
          "Belum menikah dan belum memiliki anak",
          "Menyukai anak-anak dan bersedia membantu pekerjaan rumah ringan",
          "Paspor yang masih berlaku minimal 1 tahun",
        ],
      },
      {
        id: "req-fsj",
        programName: "FSJ / BFD (Relawan Sosial)",
        badge: "Usia 18 - 26 Tahun",
        requirements: [
          "Minimal lulusan SMA/SMK sederajat",
          "Sertifikat Bahasa Jerman Goethe-Zertifikat minimal level B1",
          "Usia 18 s.d. 26 tahun saat mendaftar",
          "Memiliki jiwa sosial tinggi dan minat di bidang pelayanan masyarakat",
          "Surat motivasi (Motivationsschreiben) dalam bahasa Jerman",
          "Curriculum Vitae (Lebenslauf) standar Eropa (Europass)",
        ],
      },
    ],
    documentChecklist: [
      { id: "doc-1", name: "Ijazah & Transkrip Nilai Terakhir (Legalisir)", required: true },
      { id: "doc-2", name: "Sertifikat Bahasa Jerman Resmi (Goethe-Institut)", required: true },
      { id: "doc-3", name: "Paspor Asli dengan masa berlaku min. 1 tahun", required: true },
      { id: "doc-4", name: "Curriculum Vitae (Lebenslauf) Format Eropa", required: true },
      { id: "doc-5", name: "Surat Motivasi (Motivationsschreiben) Bahasa Jerman", required: true },
      {
        id: "doc-6",
        name: "Surat Keterangan Catatan Kepolisian (SKCK Mabes/Polda)",
        required: true,
      },
      { id: "doc-7", name: "Surat Keterangan Sehat & Bebas TBC / Hepatitis", required: true },
      {
        id: "doc-8",
        name: "Akta Kelahiran & Kartu Keluarga (Terjemahan Tersumpah)",
        required: true,
      },
    ],
    applicationSteps: [
      {
        step: 1,
        title: "Konsultasi & Penentuan Program",
        desc: "Konsultasi minat, bakat, dan verifikasi kualifikasi awal bersama konsultan ILD Medan.",
      },
      {
        step: 2,
        title: "Kursus Intensif Bahasa Jerman",
        desc: "Belajar intensif dari level pemula A1 hingga mencapai target B1/B2 untuk ujian Goethe.",
      },
      {
        step: 3,
        title: "Pemberkasan & Terjemahan Tersumpah",
        desc: "Penyusunan CV Europass, Motivationsschreiben, dan legalisir dokumen resmi.",
      },
      {
        step: 4,
        title: "Matching & Wawancara Pihak Jerman",
        desc: "Simulasi wawancara kerja (Vorstellungsgespräch) dengan perusahaan / Gastfamilie di Jerman.",
      },
      {
        step: 5,
        title: "Penerbitan Kontrak & Pengajuan Visa",
        desc: "Penerimaan Vertrag resmi, pengurusan asuransi, dan appointment Kedutaan Besar Jerman di Jakarta.",
      },
      {
        step: 6,
        title: "Briefing Pelepasan & Keberangkatan",
        desc: "Cooking class makanan Jerman, gathering bina mental, dan pendampingan tiket penerbangan.",
      },
    ],
  };

  const [formData, setFormData] = useState(data);

  const handleSave = () => {
    cmsStore.updateSection("persyaratan", formData);
    showToast("Halaman Persyaratan berhasil disimpan!");
  };

  const addRequirementItem = (progIdx: number) => {
    const copy = { ...formData };
    copy.programs[progIdx].requirements.push("Syarat baru...");
    setFormData(copy);
  };

  const removeRequirementItem = (progIdx: number, reqIdx: number) => {
    const copy = { ...formData };
    copy.programs[progIdx].requirements.splice(reqIdx, 1);
    setFormData(copy);
  };

  const addDocChecklist = () => {
    const copy = { ...formData };
    copy.documentChecklist.push({
      id: `doc-${Date.now()}`,
      name: "Dokumen Baru (cth: Terjemahan Tersumpah)",
      required: true,
    });
    setFormData(copy);
  };

  const removeDocChecklist = (idx: number) => {
    const copy = { ...formData };
    copy.documentChecklist.splice(idx, 1);
    setFormData(copy);
  };

  return (
    <div className="space-y-6 animate-fade-in w-full">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Halaman Persyaratan & Dokumen Program
          </h2>
          <p className="text-xs text-slate-500">
            Kelola kualifikasi syarat program (Ausbildung, Au Pair, FSJ), daftar checklist berkas,
            dan tahapan proses menuju Jerman.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-2.5 text-xs font-bold text-white hover:bg-sky-600 transition-all shadow-sm shadow-sky-500/20"
        >
          <Save className="h-4 w-4" />
          <span>Simpan Persyaratan</span>
        </button>
      </div>

      {/* Hero Header Editor */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900">Headline Halaman Persyaratan</h3>
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
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Deskripsi Subtitle
            </label>
            <input
              type="text"
              value={formData.heroSubtitle || ""}
              onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Program Requirements Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <FileCheck className="h-4 w-4 text-sky-600" />
          <span>Kualifikasi Persyaratan Tiap Program</span>
        </h3>

        <div className="grid gap-4 md:grid-cols-3">
          {formData.programs?.map((prog, pIdx) => (
            <div
              key={prog.id || pIdx}
              className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 shadow-xs flex flex-col justify-between"
            >
              <div>
                <input
                  type="text"
                  value={prog.programName}
                  onChange={(e) => {
                    const copy = { ...formData };
                    copy.programs[pIdx].programName = e.target.value;
                    setFormData(copy);
                  }}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-slate-900 focus:outline-none"
                />
                <input
                  type="text"
                  value={prog.badge}
                  onChange={(e) => {
                    const copy = { ...formData };
                    copy.programs[pIdx].badge = e.target.value;
                    setFormData(copy);
                  }}
                  placeholder="Badge usia / durasi"
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-sky-700 focus:outline-none"
                />

                <div className="mt-3 space-y-2">
                  <span className="text-[11px] font-bold text-slate-600 block">Daftar Syarat:</span>
                  {prog.requirements?.map((req, rIdx) => (
                    <div key={rIdx} className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={req}
                        onChange={(e) => {
                          const copy = { ...formData };
                          copy.programs[pIdx].requirements[rIdx] = e.target.value;
                          setFormData(copy);
                        }}
                        className="w-full rounded-lg border border-slate-200 bg-slate-50/70 px-2 py-1 text-[11px] text-slate-800 focus:outline-none"
                      />
                      <button
                        onClick={() => removeRequirementItem(pIdx, rIdx)}
                        className="text-rose-500 hover:text-rose-700 p-1"
                        title="Hapus Syarat"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => addRequirementItem(pIdx)}
                className="mt-3 inline-flex items-center justify-center gap-1 rounded-xl bg-sky-50 border border-sky-200 py-1.5 text-[11px] font-bold text-sky-700 hover:bg-sky-100"
              >
                <Plus className="h-3 w-3" />
                <span>Tambah Butir Syarat</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Document Checklist & Visa Steps */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Document Checklist */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-600" />
              <span>Checklist Dokumen Wajib</span>
            </h3>
            <button
              onClick={addDocChecklist}
              className="inline-flex items-center gap-1 rounded-xl bg-sky-50 border border-sky-200 px-3 py-1 text-xs font-bold text-sky-700 hover:bg-sky-100"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Tambah Berkas</span>
            </button>
          </div>

          <div className="space-y-2">
            {formData.documentChecklist?.map((doc, dIdx) => (
              <div
                key={doc.id || dIdx}
                className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50/80 p-2.5"
              >
                <input
                  type="text"
                  value={doc.name}
                  onChange={(e) => {
                    const copy = { ...formData };
                    copy.documentChecklist[dIdx].name = e.target.value;
                    setFormData(copy);
                  }}
                  className="flex-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-900 focus:outline-none"
                />
                <label className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 shrink-0">
                  <input
                    type="checkbox"
                    checked={doc.required}
                    onChange={(e) => {
                      const copy = { ...formData };
                      copy.documentChecklist[dIdx].required = e.target.checked;
                      setFormData(copy);
                    }}
                    className="rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                  />
                  <span>Wajib</span>
                </label>
                <button
                  onClick={() => removeDocChecklist(dIdx)}
                  className="text-rose-500 hover:text-rose-700 p-1"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Steps to Germany */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <ArrowRight className="h-4 w-4 text-sky-600" />
            <span>6 Langkah Menuju Jerman</span>
          </h3>

          <div className="space-y-3">
            {formData.applicationSteps?.map((step, sIdx) => (
              <div
                key={step.step || sIdx}
                className="rounded-xl border border-slate-200 bg-slate-50/80 p-3 space-y-1.5"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-500 text-[10px] font-bold text-white shrink-0">
                    {step.step || sIdx + 1}
                  </span>
                  <input
                    type="text"
                    value={step.title}
                    onChange={(e) => {
                      const copy = { ...formData };
                      copy.applicationSteps[sIdx].title = e.target.value;
                      setFormData(copy);
                    }}
                    className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-slate-900 focus:outline-none"
                  />
                </div>
                <textarea
                  rows={2}
                  value={step.desc}
                  onChange={(e) => {
                    const copy = { ...formData };
                    copy.applicationSteps[sIdx].desc = e.target.value;
                    setFormData(copy);
                  }}
                  className="w-full rounded-lg border border-slate-200 bg-white p-2 text-xs text-slate-600 focus:outline-none"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
