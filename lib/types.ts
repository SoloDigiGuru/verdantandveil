export type SalonService = {
  id: string;
  name: string;
  description: string;
  price: number;
  duration_minutes: number;
  image_key: string;
  sort_order: number;
  is_published: boolean;
};

export type OpeningHour = {
  id: string;
  day_key: string;
  day_label: string;
  open_time: string | null;
  close_time: string | null;
  is_closed: boolean;
  sort_order: number;
};

export type SalonSettings = {
  id: number;
  salon_name: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  instagram_url: string;
};
