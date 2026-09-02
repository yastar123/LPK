import { useState, useEffect } from "react";
import { Mail, Calendar, Phone, RefreshCw, Trash2, CheckCircle2, User, Clock } from "lucide-react";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  program: string;
  message: string;
  createdAt: string;
}

interface ConsultationBooking {
  id: string;
  name: string;
  phone: string;
  email: string;
  programInterest: string;
  educationLevel: string;
  germanLevel: string;
  preferredDate: string;
  notes: string;
  status?: string;
  createdAt: string;
}

export function InboxCrudTab({ showToast }: { showToast: (m: string) => void }) {
  const [activeSubTab, setActiveSubTab] = useState<"contacts" | "consultations">("contacts");
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [consultations, setConsultations] = useState<ConsultationBooking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInboxData = async () => {
    setLoading(true);
    try {
      const [resC, resB] = await Promise.all([
        fetch("/api/contacts").catch(() => null),
        fetch("/api/consultations").catch(() => null),
      ]);

      if (resC && resC.ok) {
        const data = await resC.json();
        setContacts(Array.isArray(data) ? data : data?.contacts || []);
      }
      if (resB && resB.ok) {
        const dataB = await resB.json();
        setConsultations(Array.isArray(dataB) ? dataB : dataB?.consultations || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInboxData();
  }, []);

  const handleDeleteContact = async (id: string) => {
    if (!window.confirm("Hapus pesan ini?")) return;
    try {
      await fetch(`/api/contacts/${id}`, { method: "DELETE" });
      setContacts((prev) => prev.filter((c) => c.id !== id));
      showToast("Pesan kontak berhasil dihapus dari database!");
    } catch {
      setContacts((prev) => prev.filter((c) => c.id !== id));
      showToast("Pesan dihapus!");
    }
  };

  const handleDeleteConsultation = async (id: string) => {
    if (!window.confirm("Hapus pendaftaran konsultasi ini?")) return;
    try {
      await fetch(`/api/consultations/${id}`, { method: "DELETE" });
      setConsultations((prev) => prev.filter((b) => b.id !== id));
      showToast("Pendaftaran konsultasi berhasil dihapus!");
    } catch {
      setConsultations((prev) => prev.filter((b) => b.id !== id));
      showToast("Pendaftaran dihapus!");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in w-full">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Kotak Masuk Pesan & Pendaftaran Konsultasi (PostgreSQL)
          </h2>
          <p className="text-xs text-slate-500">
            Data masuk langsung dari formulir publik kontak dan reservasi jadwal konsultasi gratis.
          </p>
        </div>
        <button
          onClick={fetchInboxData}
          disabled={loading}
          className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 px-3.5 py-2 text-xs font-bold text-slate-700 transition-all active:scale-95"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Muat Ulang Data</span>
        </button>
      </div>

      {/* Sub Tabs */}
      <div className="flex border-b border-slate-200 gap-2">
        <button
          onClick={() => setActiveSubTab("contacts")}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeSubTab === "contacts"
              ? "border-sky-600 text-sky-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Mail className="h-4 w-4" />
          <span>Pesan Masuk ({contacts.length})</span>
        </button>
        <button
          onClick={() => setActiveSubTab("consultations")}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeSubTab === "consultations"
              ? "border-sky-600 text-sky-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Calendar className="h-4 w-4" />
          <span>Jadwal Konsultasi ({consultations.length})</span>
        </button>
      </div>

      {loading ? (
        <div className="p-8 text-center text-slate-400 text-xs">
          Memuat pesan dari database PostgreSQL...
        </div>
      ) : activeSubTab === "contacts" ? (
        contacts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center space-y-2">
            <Mail className="h-8 w-8 text-slate-300 mx-auto" />
            <p className="text-xs text-slate-500">Belum ada pesan kontak yang masuk.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {contacts.map((c) => (
              <div
                key={c.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-sky-50 border border-sky-200 px-2 py-0.5 text-[10px] font-bold text-sky-700">
                      {c.program || "Umum"}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {c.createdAt ? new Date(c.createdAt).toLocaleString("id-ID") : "Baru"}
                    </span>
                  </div>
                  <h4 className="mt-2 text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-sky-600" />
                    <span>{c.name}</span>
                  </h4>
                  <div className="mt-1 flex flex-wrap gap-x-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Phone className="h-3 w-3" /> {c.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3" /> {c.email}
                    </span>
                  </div>
                  <div className="mt-3 rounded-xl bg-slate-50 p-3 text-xs text-slate-700 leading-relaxed">
                    {c.message}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={`https://wa.me/${c.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:underline"
                  >
                    <span>Balas via WhatsApp</span>
                  </a>
                  <button
                    onClick={() => handleDeleteContact(c.id)}
                    className="text-rose-500 hover:text-rose-700 p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      ) : consultations.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center space-y-2">
          <Calendar className="h-8 w-8 text-slate-300 mx-auto" />
          <p className="text-xs text-slate-500">Belum ada pendaftaran konsultasi yang masuk.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {consultations.map((b) => (
            <div
              key={b.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                    Minat: {b.programInterest}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {b.createdAt ? new Date(b.createdAt).toLocaleString("id-ID") : "Baru"}
                  </span>
                </div>
                <h4 className="mt-2 text-sm font-bold text-slate-900">{b.name}</h4>
                <div className="mt-1 flex flex-wrap gap-x-4 text-xs text-slate-500">
                  <span>Telp: {b.phone}</span>
                  <span>Email: {b.email}</span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-xl text-slate-700">
                  <div>
                    <span className="text-slate-400 block">Tingkat Pendidikan:</span>
                    <span className="font-semibold">{b.educationLevel || "-"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Level Jerman Saat Ini:</span>
                    <span className="font-semibold">{b.germanLevel || "-"}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400 block">Tanggal Pilihan Konsultasi:</span>
                    <span className="font-semibold text-sky-700">{b.preferredDate || "-"}</span>
                  </div>
                  {b.notes && (
                    <div className="col-span-2 pt-1 border-t border-slate-200/60">
                      <span className="text-slate-400 block">Catatan Tambahan:</span>
                      <span>{b.notes}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <a
                  href={`https://wa.me/${b.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:underline"
                >
                  <span>Hubungi via WhatsApp</span>
                </a>
                <button
                  onClick={() => handleDeleteConsultation(b.id)}
                  className="text-rose-500 hover:text-rose-700 p-1"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
