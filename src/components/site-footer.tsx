import { Mail, MapPin, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer id="kontak" className="scroll-mt-24 border-t border-background/5 bg-ink text-surface/60">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-16 grid gap-14 lg:grid-cols-3">
          <div>
            <div className="mb-6 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary font-display text-lg text-primary-foreground">
                G
              </div>
              <h3 className="font-display text-xl text-surface">Ich Liebe Deutsch Medan</h3>
            </div>
            <p className="mb-8 max-w-[38ch] text-pretty text-sm leading-relaxed">
              Ich Liebe Deutsch Medan adalah salah satu
              lembaga yang menjadi penyelenggara kesempatan bagi pemuda pemudi Indonesia
              menimba ilmu di Jerman khususnya Aupair dan Ausbildung.
            </p>
            <a
              href="https://wa.me/6281265965231?text=Halo%20Ich%20Liebe%20Deutsch%20Medan%2C%20saya%20ingin%20konsultasi%20program%20ke%20Jerman."
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Jadilah salah satunya!
            </a>
          </div>

          <div>
            <h4 className="mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-surface">
              <MapPin className="h-4 w-4 text-accent" /> Alamat
            </h4>
            <p className="text-sm leading-relaxed">
              Komplek Waikiki, Jl. Flamboyan Raya No. 49 Blok F, Tj. Selamat, Kec. Medan
              Tuntungan, Kota Medan, Sumatera Utara 20135
            </p>
          </div>

          <div>
            <h4 className="mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-surface">
              <Phone className="h-4 w-4 text-accent" /> Kontak
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <span className="font-semibold text-accent">WA:</span>
                <a
                  href="https://wa.me/6281265965231"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-surface"
                >
                  0812-6596-5231
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="font-semibold text-accent">Telp:</span> 0812-6596-5231
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-accent" />
                <a
                  href="mailto:indonesiagerman@gmail.com"
                  className="transition-colors hover:text-surface"
                >
                  indonesiagerman@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-background/10 pt-8 text-[10px] font-medium uppercase tracking-widest md:flex-row">
          <p>©2023 Ich Liebe Deutsch Medan. All Rights Reserved.</p>
          <p>www.germaneducation.or.id</p>
        </div>
      </div>
    </footer>
  );
}
