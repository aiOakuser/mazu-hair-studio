import type { Business } from "@/lib/types";

const ADDRESS = "5205 Prospect Rd, San Jose, CA 95129";

// Placeholder booking destination — swap for the real booking provider
// (Square Appointments / Fresha / in-house flow) per PLAN.md §4.
const BOOKING_URL = "#book";

export const business: Business = {
  name: "Maria Hair Studio",
  phone: "(408) 296-9027",
  email: "chaeukoh@gmail.com",
  address: ADDRESS,
  mapQuery: `Maria Hair Studio, ${ADDRESS}`,
  directionsHref: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `Maria Hair Studio, ${ADDRESS}`
  )}`,
  bookingHref: BOOKING_URL,
  myBookingsHref: "#my-bookings",
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
