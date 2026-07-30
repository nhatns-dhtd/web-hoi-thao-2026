import type { NavLink, ScheduleDay } from './types';

// ============================================================================
// LINK GOOGLE FORM — ĐIỀN 3 LINK CỦA AFCE 2026 VÀO ĐÂY
// ----------------------------------------------------------------------------
// Đây là nơi duy nhất khai báo link form: dùng cho cả menu (NAV_LINKS bên dưới)
// và các nút trên trang Hướng dẫn tham dự.
//
// Bỏ trống thì nút hiển thị "Đang cập nhật" và không bấm được, mục menu tương ứng
// bị loại bỏ — thay vì trỏ tác giả tới một form sai.
// ============================================================================
export const ABSTRACT_FORM_URL = "";
export const FULL_PAPER_FORM_URL = "";
export const ATTEND_FORM_URL = "";

// Menu điều hướng nằm trong code, không lưu trong DB: sửa menu = sửa file này rồi deploy.
const REGISTRATION_FORM_LINKS: NavLink[] = [
  { id: 51, name: "Nộp tóm tắt", path: ABSTRACT_FORM_URL, external: true },
  { id: 52, name: "Nộp báo cáo toàn văn", path: FULL_PAPER_FORM_URL, external: true },
  { id: 53, name: "Đăng ký tham dự", path: ATTEND_FORM_URL, external: true },
].filter(link => link.path);

export const NAV_LINKS: NavLink[] = [
  { id: 1, name: "Trang chủ", path: "/" },
  { id: 2, name: "Giới thiệu", path: "/introduction" },
  { id: 3, name: "Chương trình", path: "/schedule" },
  { id: 4, name: "Thông báo", path: "/announcements" },
  {
    id: 5, name: "Đăng ký & Nộp bài", children: [
      ...REGISTRATION_FORM_LINKS,
      { id: 54, name: "Hướng dẫn tham dự", path: "/participation-guide" },
    ]
  },
  { id: 6, name: "Kết quả duyệt bài", path: "/paper-review" },
  { id: 7, name: "Admin", path: "/admin" },
];

// Ban tổ chức chưa công bố chương trình chi tiết (Thông báo số 1 mới nêu thời gian dự kiến),
// nên trang Chương trình hiển thị các mốc thời gian đã chốt.
export const SCHEDULE_DATA: ScheduleDay[] = [
  {
    day: "AFCE 2026",
    date: "Mốc thời gian quan trọng",
    parts: [
      {
        title: "Gửi bài",
        events: [
          {
            time: "Trước 20/8/2026",
            activity: "Hạn cuối gửi toàn văn về email afce@hnmu.edu.vn",
          },
        ],
      },
      {
        title: "Diễn đàn",
        events: [
          {
            time: "Tháng 11/2026 (dự kiến)",
            activity: "Diễn đàn Văn hoá và Giáo dục mùa thu lần thứ ba tại Trường Đại học Thủ đô Hà Nội, số 98 Dương Quảng Hàm, Quan Hoa, Cầu Giấy, Hà Nội",
          },
        ],
      },
    ],
  },
];
