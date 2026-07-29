import type { ScheduleDay } from './types';

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
