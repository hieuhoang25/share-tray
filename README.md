# Share Tray — App Ẩm Thực Việt Nam Cho Người Nước Ngoài

> **Tên ứng dụng:** **Share Tray**  
> Giúp khách du lịch quốc tế tại Việt Nam (khởi đầu từ Hà Nội) tìm quán chuẩn vị người bản xứ, gọi món tự tin bằng thẻ đưa chủ quán, tham gia bàn ăn chung (Shared Table), và kết nối với người Việt tình nguyện khi gặp khó khăn.

---

## 1. Giới thiệu sản phẩm

1. **Tìm quán, gọi món, ăn đúng kiểu**:
   - Gợi ý đúng **MỘT** quán phù hợp nhất ngay lúc này dựa trên giờ giấc, thời tiết, vị trí và mức độ khám phá (**Gentle / Curious / Fearless**).
   - Thẻ gọi món ("Vendor Card") đưa cho chủ quán hiển thị bằng tiếng Việt chuẩn xác kèm lưu ý dị ứng tự động theo quy tắc ăn uống của người dùng (**Food Rules**).
   - Hướng dẫn 3 bước: Tìm quán (Find it) kèm ảnh mốc chỉ đường của người địa phương, Cách ăn (Eat it) kèm đồ gia vị trên bàn, và Cách trả tiền (Pay).
2. **Ăn cùng nhau (Together)**:
   - Ghép bàn ăn giữa người Việt và du khách quốc tế theo các format (Nửa người Việt nửa khách du lịch, Bàn dành cho nữ, Bàn theo ngành nghề...).
   - Thẻ gợi chuyện song ngữ (Conversation Cards) xóa tan sự ngại ngùng.
   - Kết nối hai chiều sau bữa ăn: **chỉ chia sẻ thông tin liên lạc khi cả hai cùng chọn nhau**, tuyệt đối bảo mật.
3. **Hỗ trợ khẩn cấp (Help)**:
   - Một chạm gọi người Việt tình nguyện khi gặp khó khăn về giá cả, gọi món, hoặc đi lạc qua phòng gọi trực tuyến miễn phí (Jitsi Meet).
   - Live captions song ngữ hỗ trợ trao đổi thời gian thực.
4. **Hộ chiếu ẩm thực (Food Passport)**:
   - Bộ sưu tập 12 món ăn Việt Nam truyền thống, nhận con dấu chứng nhận ký bởi người bản xứ sau mỗi lần trải nghiệm.

---

## 2. Kiến trúc & Tech Stack

- **Framework**: Next.js 16 (App Router) + TypeScript Strict + React 19.
- **Styling & Tokens**: Tailwind CSS tuân thủ nghiêm ngặt design tokens:
  - Font `Anton` (luôn VIẾT HOA, chữ đậm ấn tượng) và `Be Vietnam Pro`.
  - Bảng màu: `red` (#C8281E), `yellow` (#FFC72C), `ink` (#15171A), `cream` (#FFF3D1), `gray-bg` (#F1F2F4)...
  - Mọi vùng chạm (touch target) ≥ 44px.
- **Đa ngôn ngữ**: `next-intl` (mặc định tiếng Anh `en`, tiếng Việt `vi`, lưu qua cookie `NEXT_LOCALE`, không dùng tiền tố URL).
- **Kiến trúc Dữ liệu (Repository Pattern)**:
  - Tách biệt hoàn toàn `UI/API` → `services` → `repositories` (`getRepos()`).
  - Giai đoạn MVP: Sử dụng `mock store` trong bộ nhớ với seed data chất lượng cao.
  - Giai đoạn sau (Phase 9): Chuyển sang `Supabase` bằng env `DATA_SOURCE=supabase` mà không phải thay đổi UI.
- **Xác thực**: `MockAuth` ký cookie JWT `httpOnly` bằng `AUTH_SECRET`, bảo vệ khu vực `/admin/**` và các chức năng cá nhân.

---

## 3. Cấu trúc thư mục

```
src/
├── app/
│   ├── (app)/                  # 14 màn hình người dùng, layout mobile (max 480px) + BottomNav
│   │   ├── page.tsx            # Màn 1: Home (Hungry? Go here. + Food Passport)
│   │   ├── dishes/             # Màn 2: Chọn theo món
│   │   ├── places/[slug]/      # Màn 3: Chi tiết quán
│   │   │   ├── order/          # Màn 4: Menu & thẻ đưa người bán (Vendor Card)
│   │   │   └── guide/          # Màn 5: Hướng dẫn Find it / Eat it / Pay
│   │   ├── together/           # Màn 6: Danh sách bàn ăn chung
│   │   ├── tables/
│   │   │   ├── [id]/           # Màn 7: Chi tiết bàn ăn
│   │   │   │   ├── live/       # Màn 8: Trong bữa ăn (Thẻ gợi chuyện, từ vựng)
│   │   │   │   └── after/      # Màn 9: Sau bữa ăn (Kết nối hai chiều)
│   │   │   └── new/            # Màn 10: Tự mở bàn ăn mới
│   │   ├── company/            # Màn 11: Đi ăn cùng 1 local / thuê hướng dẫn viên
│   │   ├── help/               # Màn 12: Gọi người Việt tình nguyện (Jitsi Meet)
│   │   ├── days/[slug]/        # Màn 13: Mượn một ngày của người Hà Nội
│   │   ├── contribute/         # Màn 14: Người Việt thêm quán quen (tiếng Việt)
│   │   └── profile/            # Hồ sơ cá nhân & Food Rules
│   ├── (auth)/login/           # Đăng nhập nhanh bằng tài khoản seed
│   ├── admin/                  # Quản trị hệ thống (desktop layout riêng biệt)
│   ├── api/                    # Route Handlers mỏng gọi services
│   ├── dev/ui/                 # Trang trưng bày toàn bộ Shared UI Components
│   ├── globals.css             # Design tokens & font import
│   ├── layout.tsx              # Root layout kèm next-intl provider
│   └── manifest.ts             # App manifest PWA
├── components/
│   └── ui/                     # Shared components (ScreenHeader, Button, Chip, Cards, BottomNav...)
├── i18n/                       # Cấu hình next-intl
├── messages/                   # en.json, vi.json
├── lib/                        # Format tiền tệ (₫, $), thời gian, khoảng cách GPS
├── types/domain.ts             # Nguồn sự thật duy nhất về kiểu dữ liệu (Single Source of Truth)
├── schemas/                    # Zod schemas tương ứng domain
└── server/
    ├── repositories/           # Repository pattern (mock store & interface)
    ├── services/               # Toàn bộ logic nghiệp vụ (food, help, tables, auth...)
    ├── auth/                   # MockAuth service & JWT
    └── providers/              # CallProvider (Jitsi), StubInterpreterProvider
```

---

## 4. Hướng dẫn cài đặt & Chạy Local

### Yêu cầu môi trường:
- Node.js >= 20.x
- npm >= 10.x

### Cài đặt:
```bash
# Cài đặt dependencies (khuyến nghị dùng --legacy-peer-deps khi có cảnh báo peer)
npm install --legacy-peer-deps

# Khởi chạy môi trường development
npm run dev
```

Mở trình duyệt tại [http://localhost:3000](http://localhost:3000).  
Trang xem thử giao diện UI Kit: [http://localhost:3000/dev/ui](http://localhost:3000/dev/ui).

---

## 5. Biến môi trường (`.env.local`)

Tạo file `.env.local` dựa trên `.env.example`:

```bash
DATA_SOURCE=mock            # mock | supabase
DEMO_MODE=true              # bật Dev bar & reset demo
MOCK_LATENCY_MS=0           # Độ trễ giả lập (ms)
AUTH_SECRET=share-tray-dev-secret-key-at-least-32-chars-long
USD_RATE=26000              # Tỷ giá quy đổi VND -> USD
```

### Triển khai lên Netlify:
Dự án đã có sẵn file cấu hình `netlify.toml` ở thư mục gốc chứa cấu hình build và các biến môi trường mặc định. Bạn chỉ cần liên kết repository trên [Netlify](https://www.netlify.com/) và bấm **Deploy**.

---

## 6. Tài khoản Seed Demo & Đăng nhập

Hệ thống cung cấp sẵn các hồ sơ người dùng mẫu tại trang `/login`:
- **Linh** (`user-linh`): Local, kiến trúc sư Hà Nội, 6 năm quen quán Phở Bà Tâm, tình nguyện viên.
- **Kenji** (`user-kenji`): Traveller đến từ Tokyo, có quy tắc ăn uống `no_pork`, `no_peanut`.
- **Thảo** (`user-thao`): Local & Host bàn ăn, thợ rang cà phê, hồ sơ nữ (tham gia được bàn Women only).
- **Minh Anh** (`user-minhanh`): Hướng dẫn viên du lịch & Tình nguyện viên trợ giúp khẩn cấp.
- **Admin** (`user-admin`): Quản trị viên, có toàn quyền truy cập khu vực `/admin/**`.

---

## 7. Khôi phục dữ liệu Demo (Reset Store)

Khi thực hiện thao tác thử nghiệm (nhận ghế, gửi review, gửi quán mới...), bạn có thể đưa dữ liệu về ban đầu:
- **Giao diện**: Nhấn nút **"Reset demo data"** trên trang Admin.
- **API**: Gửi request `POST /api/dev/reset`.

---

## 8. Kiểm thử & Đảm bảo chất lượng

Dự án được bảo vệ bởi bộ test tự động sử dụng **Vitest**:
```bash
# Chạy toàn bộ Unit Tests
npm run test

# Kiểm tra cú pháp & quy tắc TypeScript/ESLint
npm run lint

# Build sản phẩm kiểm tra hoàn thiện
npm run build
```

---

## 9. Danh mục TODO cho Phase 9 (Gắn Supabase)

- [ ] Cung cấp Supabase Project URL, `SUPABASE_ANON_KEY` và `SUPABASE_SERVICE_ROLE_KEY`.
- [ ] Chạy migration bảng Postgres và thiết lập Row Level Security (RLS) theo `src/types/domain.ts`.
- [ ] Hoàn thiện cài đặt repository tại `src/server/repositories/supabase/`.
- [ ] Cấu hình Supabase Storage cho buckets: `place-photos`, `table-photos`, `avatars`.
- [ ] Thiết lập GitHub Actions định kỳ giữ project Supabase không bị tạm dừng.
