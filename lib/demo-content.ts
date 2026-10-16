import type { OpeningHour, SalonService } from "@/lib/types";

// These are safe preview values used before Supabase is configured. Once connected,
// the homepage reads published services and opening hours from the database.
export const demoServices: SalonService[] = [
  { id: "demo-1", name: "The Signature Facial", description: "A considered skin ritual with a gentle cleanse, exfoliation and a replenishing mask.", price: 28000, duration_minutes: 60, image_key: "facial", sort_order: 1, is_published: true },
  { id: "demo-2", name: "Silk Press & Finish", description: "A smooth, polished finish with a soft movement and a healthy-looking sheen.", price: 35000, duration_minutes: 90, image_key: "silk-press", sort_order: 2, is_published: true },
  { id: "demo-3", name: "The Veil Manicure", description: "Thoughtful nail care, detailed shaping and a beautifully understated finish.", price: 18000, duration_minutes: 45, image_key: "manicure", sort_order: 3, is_published: true },
  { id: "demo-4", name: "Brow Shape & Define", description: "A tailored brow tidy designed to complement your natural features.", price: 12000, duration_minutes: 30, image_key: "brows", sort_order: 4, is_published: true }
];

export const demoHours: OpeningHour[] = [
  { id: "h1", day_key: "monday", day_label: "Monday", open_time: "09:00", close_time: "18:00", is_closed: false, sort_order: 1 },
  { id: "h2", day_key: "tuesday", day_label: "Tuesday", open_time: "09:00", close_time: "18:00", is_closed: false, sort_order: 2 },
  { id: "h3", day_key: "wednesday", day_label: "Wednesday", open_time: "09:00", close_time: "18:00", is_closed: false, sort_order: 3 },
  { id: "h4", day_key: "thursday", day_label: "Thursday", open_time: "09:00", close_time: "19:00", is_closed: false, sort_order: 4 },
  { id: "h5", day_key: "friday", day_label: "Friday", open_time: "09:00", close_time: "19:00", is_closed: false, sort_order: 5 },
  { id: "h6", day_key: "saturday", day_label: "Saturday", open_time: "10:00", close_time: "17:00", is_closed: false, sort_order: 6 },
  { id: "h7", day_key: "sunday", day_label: "Sunday", open_time: null, close_time: null, is_closed: true, sort_order: 7 }
];
