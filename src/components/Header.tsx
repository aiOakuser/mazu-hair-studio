import Image from "next/image";
import Link from "next/link";
import { AccountButton } from "@/components/AccountButton";
import { CartIcon } from "@/components/icons";

export function Header({ businessName }: { businessName: string }) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
      <div className="flex w-full items-center justify-between gap-4 px-6 py-2">
        <Link href="/" aria-label={businessName} className="flex shrink-0 items-center py-2">
          <div className="relative h-20 aspect-[1008/577] overflow-hidden rounded-xl bg-[#f2ede3] sm:h-24">
            <Image
              src="/logo.png"
              alt={businessName}
              fill
              sizes="180px"
              className="object-cover"
              priority
            />
          </div>
        </Link>
        <div className="flex items-center gap-4 text-foreground">
          <AccountButton />
          <button type="button" aria-label="Cart" className="transition-colors hover:text-accent">
            <CartIcon />
          </button>
        </div>
      </div>
    </header>
  );
}
