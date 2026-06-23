import Link from "next/link";
import { Map } from "lucide-react";

const links = [
  { href: "/atlas", label: "Atlas" },
  { href: "/eras/joseon", label: "Eras" },
  { href: "/about", label: "About" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/95 backdrop-blur-md">
      <div className="mx-auto flex h-[4.5rem] max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-12 xl:px-16">
        <Link href="/" className="flex items-center gap-3 text-paper transition-colors hover:text-accent" aria-label="Hanistry home">
          <Map size={21} strokeWidth={1.45} />
          <span className="font-display text-[1.7rem] tracking-[-0.03em]">Hanistry</span>
        </Link>
        <nav aria-label="Primary navigation" className="flex items-center gap-4 text-[0.82rem] text-muted sm:gap-7 sm:text-sm">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="py-3 transition-colors hover:text-paper focus-visible:text-paper">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
