import type { ScheduleDay } from './types';

// ============================================================================
// LINK GOOGLE FORM — ĐIỀN 3 LINK CỦA AFCE 2026 VÀO ĐÂY
// ----------------------------------------------------------------------------
// Bỏ trống thì nút tương ứng hiển thị "Đang cập nhật" và không bấm được,
// thay vì trỏ tới một form sai.
//
// Sau khi điền, phải cập nhật y hệt 3 link này trong `api/constants.js`
// (NAV_LINKS dùng cho menu, được seed vào DB) rồi chạy `npm run seed -- --force`.
// ============================================================================
export const ABSTRACT_FORM_URL = "";
export const FULL_PAPER_FORM_URL = "";
export const ATTEND_FORM_URL = "";

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
