import { Header } from "@/components/Header";
import { BusinessInfoBar } from "@/components/BusinessInfoBar";
import { Button } from "@/components/Button";
import { ServiceMenuTabs } from "@/components/ServiceMenuTabs";
import { LocationFooter } from "@/components/LocationFooter";
import { business } from "@/data/business";
import { services } from "@/data/services";
import { staff } from "@/data/staff";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <Header businessName={business.name} />

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div>
              <h1 className="text-xl font-semibold text-ink mb-3">Service menu</h1>
              <BusinessInfoBar business={business} />
            </div>
            <div className="flex flex-col gap-2 w-full md:w-48 shrink-0">
              <Button href={business.bookingHref} variant="primary">
                Book
              </Button>
              <Button href={business.myBookingsHref} variant="secondary">
                My bookings
              </Button>
            </div>
          </div>

          <div className="mt-8">
            <ServiceMenuTabs services={services} staff={staff} />
          </div>
        </div>
      </main>

      <LocationFooter business={business} />
    </div>
  );
}
