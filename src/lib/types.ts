export interface Service {
  id: string;
  name: string;
  /** Category tab this service is grouped under, e.g. "Haircut", "Color". */
  category: string;
  /** Freeform human price summary shown under the title, e.g. "$80 – $120", "$330–", "Price Varies". */
  priceLabel: string;
  /** Optional 1-3 sentence description. Omit entirely (not empty string) when the card has none. */
  description?: string;
  /** Canonical restated price shown bottom-right of the card, e.g. "$80.00". */
  priceValueLabel: string;
  /** Duration shown bottom-right next to the price, e.g. "1hr", "3hrs 30 mins". Omit for price-varies services. */
  durationLabel?: string;
  bookingHref: string;
}

export interface DayHours {
  day: string;
  open?: string;
  close?: string;
}

export interface Business {
  name: string;
  phone: string;
  email: string;
  address: string;
  mapQuery: string;
  directionsHref: string;
  bookingHref: string;
  myBookingsHref: string;
  hours: DayHours[];
  cancellationPolicy: string[];
}
