import type { Business } from "@/lib/types";

const ADDRESS = "5205 Prospect Rd, San Jose, CA 95129";

const BOOKING_URL = "https://book.globaldesignerhub.com/appointments";

export const business: Business = {
  name: "mazu Hair Studio",
  phone: "(408) 296-9027",
  email: "chaeukoh@gmail.com",
  address: ADDRESS,
  mapQuery: `mazu Hair Studio, ${ADDRESS}`,
  directionsHref: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `mazu Hair Studio, ${ADDRESS}`,
  )}`,
  bookingHref: BOOKING_URL,
  myBookingsHref: "https://app.globaldesignerhub.com",
  accountHref:
    "https://mazu-hair-studio.globaldesignerhub.com/customer-accounts",
  cancellationPolicy: [
    "We ask that you please reschedule or cancel at least 2 days before the beginning of your appointment or you may be charged a cancellation fee.",
    "Less than 24 hour notice will result in a charge equal to 100% of the reserved service amount.",
    "“No shows” and “same day cancellation” will also be charged 100% of the reserved service amount.",
    "Thank you for your understanding.",
  ],
  hours: [
    { day: "Monday" },
    { day: "Tuesday", open: "10:00 am", close: "6:00 pm" },
    { day: "Wednesday", open: "10:00 am", close: "6:00 pm" },
    { day: "Thursday", open: "10:00 am", close: "6:00 pm" },
    { day: "Friday", open: "10:00 am", close: "6:00 pm" },
    { day: "Saturday", open: "10:00 am", close: "7:00 pm" },
    { day: "Sunday" },
  ],
};
