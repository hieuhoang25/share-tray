import { z } from 'zod';

export const BraveLevelSchema = z.enum(['gentle', 'curious', 'fearless']);
export const UserRoleSchema = z.enum(['traveller', 'local', 'guide', 'admin']);
export const PlaceStatusSchema = z.enum(['pending', 'published', 'hidden']);
export const TableStatusSchema = z.enum(['open', 'full', 'live', 'done', 'cancelled']);

export const ProfileSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  display_name: z.string().min(1),
  age: z.number().int().min(10),
  country: z.string().min(1),
  city: z.string().min(1),
  work: z.string(),
  languages: z.array(z.string()),
  ask_me_about: z.string(),
  role: UserRoleSchema,
  is_verified: z.boolean(),
  verified_at: z.string().optional(),
  food_rules: z.array(z.string()),
  brave_level: BraveLevelSchema,
  ui_lang: z.enum(['en', 'vi']),
  is_volunteer: z.boolean(),
  volunteer_available: z.boolean(),
  gender: z.enum(['female', 'male', 'other']).optional(),
  avatar_url: z.string().optional(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const ContributionSchema = z.object({
  name: z.string().min(2, 'Tên quán tối thiểu 2 ký tự'),
  how_known: z.string().min(1, 'Vui lòng chọn nguồn gốc biết quán'),
  usual_order: z.string().min(2, 'Vui lòng nhập món bạn hay gọi'),
  price_paid: z.number().min(1000, 'Giá tiền không hợp lệ'),
  why_delicious: z.string().min(5, 'Vui lòng nêu lý do quán ngon'),
  score_price: z.number().min(1).max(5),
  score_service: z.number().min(1).max(5),
  score_space: z.number().min(1).max(5),
  nearby_utilities: z.array(z.string()).optional(),
  memory: z.string().optional(),
});

export const TableCreateSchema = z.object({
  place_id: z.string().min(1),
  starts_at: z.string().min(1),
  duration_min: z.number().min(15).max(180),
  who_welcome: z.string(),
  purpose: z.string(),
  seats_total: z.number().min(2).max(10),
  title: z.string().min(3),
  description: z.string().min(5),
  est_price: z.number().min(0),
});

export const ReportSchema = z.object({
  target_type: z.enum(['user', 'table', 'place', 'review']),
  target_id: z.string().min(1),
  reason: z.string().min(3),
});
