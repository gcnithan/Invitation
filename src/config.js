/**
 * Everything you need to personalize is in this file.
 *
 * Photos
 *   1. Put image files in public/photos/  (1.jpg, 2.jpg, …)
 *   2. Set each gallery item src, for example src: "/photos/1.jpg"
 *
 * Google Maps
 *   Paste your share link into venue.mapsLink.
 *   The “Get directions” button uses that link.
 *   The embedded map uses venue.mapQuery (the place name is fine).
 */

const venueAddress = "Sri Jagadguru Renukacharya Kalyana Mantapa, Chikkamagaluru";

export const config = {
  bride: "Sangeeetha",
  groom: "Naveen",
  coverDate: "November 19, 2026",
  coverLine: "Cordially Invites",

  brideFamily: {
    title: "Mr. & Mrs.",
    father: "Mr. Mallikarjun",
    mother: "Mrs. Nethravathi",
    address:
      "Devarahally, Mathighatta(P), Kadur (T), Chikmagaluru (D), - 577548.",
  },
  groomFamily: {
    title: "Mr. & Mrs.",
    father: "Mr. Chandrashekhar",
    mother: "Mrs. Bharathi",
    address: "Ganadalu, Lakya(P), Chikkamagaluru (577168).",
  },

  announcement: ["We joyfully announce", "the wedding of our children"],

  ceremonies: [
    {
      title:
        "Muhurtam ceremony at Sri Jagadguru Renukacharya Kalyana Mantapa, Chikkamagaluru",
      time: "10 AM",
      date: "2026-11-20",
    },
    {
      title:
        "Wedding ceremony at Sri Jagadguru Renukacharya Kalyana Mantapa, Chikkamagaluru",
      time: "12 PM",
      date: "2026-11-20",
    },
  ],

  reception: {
    heading: "The reception will take place at:",
    time: "07:00",
    date: "2026-11-19",
  },

  countdownTo: "2026-11-19T07:00:00+05:30",

  calendar: {
    title: "Naveen & Sangeeetha's Wedding",
    details:
      "Join us to celebrate the wedding of Naveen & Sangeeetha at Sri Jagadguru Renukacharya Kalyana Mantapa, Chikkamagaluru",
    startUtc: "20261119T013000Z",
    endUtc: "20261119T033000Z",
  },

  venue: {
    title: "Wedding Reception Venue",
    address: venueAddress,
    mapQuery: venueAddress,
    mapsLink: "",
  },

  thankYou: "Your presence would be the greatest gift we could receive!",

  gallery: [
    { src: "/photos/1.jpg", alt: "Sangeeetha and Naveen by the waterfall", position: "50% 58%" },
    { src: "/photos/2.jpg", alt: "Sangeeetha and Naveen standing in the stream", position: "50% 42%" },
    { src: "/photos/3.jpg", alt: "Sangeeetha and Naveen at the temple", position: "50% 46%" },
    { src: "/photos/4.jpg", alt: "Sangeeetha and Naveen in the hills", position: "50% 38%" },
  ],
};

export function splitDate(iso) {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return {
    year,
    monthIndex: month - 1,
    day,
    weekday: date.toLocaleDateString("en-US", { weekday: "long" }),
    month: date.toLocaleDateString("en-US", { month: "long" }),
  };
}

export function calendarUrl() {
  const { calendar, venue } = config;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: calendar.title,
    dates: `${calendar.startUtc}/${calendar.endUtc}`,
    ctz: "Asia/Calcutta",
    details: calendar.details,
    location: venue.address,
  });
  return `https://www.google.com/calendar/render?${params.toString()}`;
}

export function directionsUrl() {
  if (config.venue.mapsLink) return config.venue.mapsLink;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(config.venue.mapQuery)}`;
}

export function mapEmbedUrl() {
  return `https://maps.google.com/maps?q=${encodeURIComponent(config.venue.mapQuery)}&z=16&output=embed`;
}
