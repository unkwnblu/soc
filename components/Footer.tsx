import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/fashion", label: "Fashion" },
  { href: "/playlist-library", label: "Playlists" },
  { href: "/about", label: "About" },
  { href: "/search", label: "Search" },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t-2 border-black">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <h3 className="font-serif font-black text-4xl text-yellow-300 mb-3 leading-tight">
              Souls of<br />Creative
            </h3>
            <p className="font-mono text-sm text-white/60 leading-relaxed">
              A digital magazine for the creative soul. Fashion, music, culture,
              and the people building the next wave.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-mono font-bold text-yellow-300 mb-4 text-xs uppercase tracking-widest">
              Navigate
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-mono text-sm text-white/60 hover:text-yellow-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-mono font-bold text-yellow-300 mb-4 text-xs uppercase tracking-widest">
              Connect
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Instagram", href: "https://www.instagram.com/soulsofcreatives?igsh=dmEzb2NlMDM1MGl6" },
                { label: "Twitter / X", href: "https://x.com/soulsofcreative?s=11" },
                { label: "TikTok", href: "https://www.tiktok.com/@soulsofcreatives?_r=1&_t=ZS-94R46ffJ2ds" },
              ].map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm text-white/60 hover:text-yellow-300 transition-colors"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-mono text-xs text-white/40">
            © {new Date().getFullYear()} Souls of Creatives. All rights
            reserved.
          </p>
          <Link
            href="/admin"
            className="font-mono text-xs text-white/30 hover:text-white/70 transition-colors"
          >
            Admin →
          </Link>
        </div>
      </div>
    </footer>
  );
}
