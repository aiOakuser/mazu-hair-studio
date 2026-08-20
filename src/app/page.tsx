import Link from "next/link";
import { Header } from "@/components/Header";
import { BookingExperience } from "@/components/BookingExperience";
import { LocationFooter } from "@/components/LocationFooter";
import { business } from "@/data/business";
import { services } from "@/data/services";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <Header businessName={business.name} />

      <main className="flex-1">
        <div className="mx-auto max-w-[162rem] px-6 py-8 lg:py-10">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="font-display text-2xl text-foreground sm:text-3xl">Book an appointment</h1>
              <p className="mt-1 text-foreground/70">
                Pick a category, add services, and we&apos;ll take it from there.
              </p>
            </div>

            <div className="flex w-full flex-col gap-2 sm:w-48 sm:shrink-0">
              <Link
                href={business.bookingHref}
                className="inline-flex w-full items-center justify-center rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-ink-on-fill transition-colors hover:bg-accent-hover"
              >
                Book
              </Link>
              <Link
                href={business.myBookingsHref}
                className="inline-flex w-full items-center justify-center rounded-full border border-foreground/40 px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                My bookings
              </Link>
            </div>
          </div>

          <BookingExperience services={services} business={business} />
        </div>
      </main>

      <LocationFooter business={business} />
    </div>
  );
}
