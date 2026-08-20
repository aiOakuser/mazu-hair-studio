import Link from "next/link";
import { business } from "@/data/business";
import { AccountIcon } from "@/components/icons";

export function AccountButton() {
  return (
    <Link
      href={business.accountHref}
      aria-label="Account"
      className="transition-colors hover:text-accent"
    >
      <AccountIcon />
    </Link>
  );
}
