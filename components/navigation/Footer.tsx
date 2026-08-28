import { siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="relative border-t border-mist/10 bg-forest-deep">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10">
        <div className="flex flex-col items-center text-center">
          <span className="font-display text-4xl tracking-[0.3em] text-mist-white">
            {siteConfig.shortTitle}
          </span>
          <p className="mt-4 text-xs uppercase tracking-[0.3em] text-mist/50">
            Mukteshwar · Saliyakote · Sundarkhal · Dharapani · Nainital
          </p>

          <nav className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3">
            {siteConfig.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs uppercase tracking-[0.2em] text-mist/60 transition-colors hover:text-mist-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mt-10 h-px w-24 bg-golden/40" />

          <p className="mt-8 text-sm text-mist/70">
            Made with <span aria-hidden>❤️</span> for the mountains
          </p>

          <p className="mt-4 text-sm text-mist/50">
            Creator: <span className="text-mist-white">{siteConfig.author}</span> · Contact:{" "}
            <a href={`tel:+91${siteConfig.phone}`} className="text-golden hover:underline">
              {siteConfig.phone.slice(0, 5)} {siteConfig.phone.slice(5)}
            </a>
          </p>

          <p className="mt-8 max-w-xl text-[11px] leading-relaxed text-mist/35">
            Kumaon, Uttarakhand · An immersive digital journey. Local-area descriptions are
            community-level and openly editable by the owner.
          </p>
        </div>
      </div>
    </footer>
  );
}
