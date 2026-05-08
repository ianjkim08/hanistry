import Link from "next/link";
import { Compass, Search } from "lucide-react";

const links = [
  { href: "/atlas", label: "Atlas" },
  { href: "/eras/joseon", label: "Eras" },
  { href: "/about", label: "About" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-md border border-jade/40 bg-jade/10 text-jade">
            <Compass size={18} />
          </span>
          <span className="font-display text-2xl tracking-normal">Hanistry</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/atlas"
          className="inline-flex h-10 items-center gap-2 rounded-md border border-white/10 bg-white/[0.06] px-3 text-sm text-white/80 transition hover:border-jade/40 hover:text-white"
        >
          <Search size={16} />
          Explore
        </Link>
      </div>
    </header>
  );
}
