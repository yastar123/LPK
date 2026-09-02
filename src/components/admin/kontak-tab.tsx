import { useState } from "react";
import { Save, MapPin, Phone, Mail, Clock, Globe } from "lucide-react";
import { CmsContextValue } from "@/lib/cms-store";

export function KontakCrudTab({
  cmsStore,
  showToast,
}: {
  cmsStore: CmsContextValue;
  showToast: (m: string) => void;
}) {
  const footerData = cmsStore.cms.footer;
  const [formData, setFormData] = useState({
    officeAddress: footerData.officeAddress || "",
    phone: footerData.phone || "",
    whatsapp: footerData.whatsapp || "",
    email: footerData.email || "",
    operatingHours: footerData.operatingHours || "",
    instagram: footerData.socials?.instagram || "",
    facebook: footerData.socials?.facebook || "",
    youtube: footerData.socials?.youtube || "",
    tiktok: footerData.socials?.tiktok || "",
  });

  const handleSave = () => {
    cmsStore.updateFooter({
      ...footerData,
      officeAddress: formData.officeAddress,
      phone: formData.phone,
      whatsapp: formData.whatsapp,
      email: formData.email,
      operatingHours: formData.operatingHours,
      socials: {
        instagram: formData.instagram,
        facebook: formData.facebook,
        youtube: formData.youtube,
        tiktok: formData.tiktok,
      },
    });
    showToast("Informasi Kontak & Lokasi Kantor berhasil disimpan!");
  };

  return (
    <div className="space-y-6 animate-fade-in w-full">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Halaman Kontak, Alamat Kantor & Media Sosial
          </h2>
          <p className="text-xs text-slate-500">
            Kelola alamat kantor fisik Medan Tuntungan, nomor hotline WhatsApp, email, dan akun
            media sosial.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-2.5 text-xs font-bold text-white hover:bg-sky-600 transition-all shadow-sm shadow-sky-500/20"
        >
          <Save className="h-4 w-4" />
          <span>Simpan Kontak</span>
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Office & Hotline */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-sky-600" />
            <span>Alamat Kantor Fisik & Jam Operasional</span>
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Alamat Lengkap Kantor Medan
            </label>
            <textarea
              rows={3}
              value={formData.officeAddress}
              onChange={(e) => setFormData({ ...formData, officeAddress: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-3 text-xs text-slate-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Jam Operasional Kantor
            </label>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={formData.operatingHours}
                onChange={(e) => setFormData({ ...formData, operatingHours: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs text-slate-900 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Hotline WhatsApp
              </label>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs text-slate-900 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Resmi</label>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs text-slate-900 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Globe className="h-4 w-4 text-sky-600" />
            <span>Tautan Media Sosial Resmi</span>
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Instagram URL</label>
            <input
              type="text"
              value={formData.instagram}
              onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs text-slate-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Facebook URL</label>
            <input
              type="text"
              value={formData.facebook}
              onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs text-slate-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">YouTube URL</label>
            <input
              type="text"
              value={formData.youtube}
              onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs text-slate-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">TikTok URL</label>
            <input
              type="text"
              value={formData.tiktok}
              onChange={(e) => setFormData({ ...formData, tiktok: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs text-slate-900 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
