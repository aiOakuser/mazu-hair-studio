import Link from "next/link";

function AccountIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M4 20c0-3.5 3.5-6 8-6s8 2.5 8 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 4h2l2.2 11.2a2 2 0 0 0 2 1.6h6.6a2 2 0 0 0 2-1.6L20.5 8H7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="20.5" r="1.2" fill="currentColor" />
      <circle cx="17" cy="20.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function Header({ businessName }: { businessName: string }) {
  return (
    <header className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
        <div className="w-10" aria-hidden="true" />
        <Link
          href="/"
          className="font-display text-lg tracking-wide text-ink"
        >
          {businessName}
        </Link>
        <div className="flex items-center gap-4 text-ink">
          <button type="button" aria-label="Account" className="hover:text-text-secondary">
            <AccountIcon />
          </button>
          <button type="button" aria-label="Cart" className="hover:text-text-secondary">
            <CartIcon />
          </button>
        </div>
      </div>
    </header>
  );
}
