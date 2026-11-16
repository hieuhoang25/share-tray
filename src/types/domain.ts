export type UserRole = 'traveller' | 'local' | 'guide' | 'admin';
export type BraveLevel = 'gentle' | 'curious' | 'fearless';
export type PlaceStatus = 'pending' | 'published' | 'hidden';
export type ReviewStatus = 'pending' | 'published' | 'hidden';
export type TableStatus = 'open' | 'full' | 'live' | 'done' | 'cancelled';
export type HelpStatus = 'waiting' | 'accepted' | 'done' | 'cancelled';

export interface Profile {
  id: string;
  user_id: string;
  display_name: string;
  age: number;
  country: string;
  city: string;
  work: string;
  languages: string[];
  ask_me_about: string;
  role: UserRole;
  is_verified: boolean;
  verified_at?: string;
  food_rules: string[];
  brave_level: BraveLevel;
  ui_lang: 'en' | 'vi';
  is_volunteer: boolean;
  volunteer_available: boolean;
  gender?: 'female' | 'male' | 'other';
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Dish {
  id: string;
  slug: string;
  name_vi: string;
  gloss_en: string;
  description_en: string;
  meal_times: ('breakfast' | 'lunch' | 'afternoon' | 'dinner' | 'late')[];
  passport: boolean;
  created_at: string;
}

export interface Place {
  id: string;
  slug: string;
  name: string;
  dish_id: string;
  district: string;
  city: string;
  lat: number;
  lng: number;
  price_min: number;
  price_max: number;
  level: BraveLevel;
  open_hours: {
    open: string;
    close: string;
    days?: number[];
  };
  covered_seating: boolean;
  cash_only: boolean;
  known_for_en: string;
  downside_en: string;
  status: PlaceStatus;
  submitted_by?: string;
  created_at: string;
  updated_at: string;
}

export interface PlacePraise {
  id: string;
  place_id: string;
  order: number;
  title_en: string;
  text_en: string;
  mention_count: number;
}

export interface MenuItem {
  id: string;
  place_id: string;
  name_vi: string;
  gloss_en: string;
  price: number;
  contains: string[];
  order: number;
}

export interface Usual {
  id: string;
  place_id: string;
  local_id: string;
  order_text_vi: string;
  order_text_en: string;
  price_paid: number;
  years_eating: number;
  menu_item_ids: string[];
  created_at: string;
}

export interface Review {
  id: string;
  place_id: string;
  author_id: string;
  how_known: string;
  score_price: number;
  score_service: number;
  score_space: number;
  praise_vi: string;
  memory_vi: string;
  text_en: string;
  status: ReviewStatus;
  created_at: string;
}

export interface NearbyPoint {
  id: string;
  place_id: string;
  kind: 'see' | 'eat' | 'useful';
  name: string;
  walk_min: number;
  note_en: string;
}

export interface FindStep {
  id: string;
  place_id: string;
  order: number;
  photo_path: string;
  text_en: string;
}

export interface EatGuide {
  id: string;
  dish_id: string;
  steps_en: string[];
  table_items: {
    name_vi: string;
    name_en: string;
    intensity: string;
    description: string;
  }[];
  stomach_advice_en?: string;
}

export interface PriceReport {
  id: string;
  place_id: string;
  user_id: string;
  amount: number;
  created_at: string;
}

export interface OpenConfirmation {
  id: string;
  place_id: string;
  local_id: string;
  created_at: string;
}

export interface PassportStamp {
  id: string;
  user_id: string;
  dish_id: string;
  place_id: string;
  usual_id?: string;
  created_at: string;
}

export interface ThankYou {
  id: string;
  from_user: string;
  to_local: string;
  usual_id?: string;
  message: string;
  photo_path?: string;
  created_at: string;
}

export interface Day {
  id: string;
  slug: string;
  local_id: string;
  title: string;
  intro_en: string;
  area: string;
  walk_km: number;
  status: 'published' | 'draft';
  created_at: string;
}

export interface DayStop {
  id: string;
  day_id: string;
  order: number;
  time: string;
  place_id: string;
  dish_label: string;
  memory_en: string;
}

export interface Table {
  id: string;
  host_id: string;
  place_id: string;
  starts_at: string;
  duration_min: number;
  format: string;
  who_welcome: string;
  purpose: 'New friends' | 'Work contacts' | 'Language practice' | 'Travel buddies' | string;
  title: string;
  description: string;
  seats_total: number;
  est_price: number;
  status: TableStatus;
  created_at: string;
}

export interface TableMember {
  id: string;
  table_id: string;
  user_id: string;
  is_host: boolean;
  joined_at: string;
  left_at?: string;
}

export interface TableWord {
  id: string;
  table_id: string;
  user_id: string;
  word: string;
  meaning: string;
  language: string;
  created_at: string;
}

export interface ConversationCard {
  id: string;
  text_en: string;
  text_vi: string;
  active: boolean;
}

export interface TableRitual {
  id: string;
  dish_id: string;
  order: number;
  text_en: string;
}

export interface Connection {
  id: string;
  table_id: string;
  from_user: string;
  to_user: string;
  created_at: string;
}

export interface HostKudo {
  id: string;
  table_id: string;
  from_user: string;
  host_id: string;
  kind: string;
  created_at: string;
}

export interface CompanyOffer {
  id: string;
  local_id: string;
  mode: 'meal' | 'guide';
  plan_en: string;
  available_from: string;
  duration_min: number;
  price_note: string;
  is_verified_guide?: boolean;
}

export interface CompanyRequest {
  id: string;
  offer_id: string;
  traveller_id: string;
  status: 'pending' | 'accepted' | 'declined';
  created_at: string;
}

export interface HelpRequest {
  id: string;
  traveller_id: string;
  reason: string;
  place_id?: string;
  lat?: number;
  lng?: number;
  order_snapshot?: Record<string, unknown>;
  volunteer_id?: string;
  status: HelpStatus;
  call_url?: string;
  created_at: string;
}

export interface Report {
  id: string;
  reporter_id: string;
  target_type: 'user' | 'table' | 'place' | 'review';
  target_id: string;
  reason: string;
  status: 'pending' | 'resolved' | 'dismissed';
  created_at: string;
}

export interface AppConfig {
  key: string;
  value: Record<string, unknown> | string | number | boolean;
}
