// Menu điều hướng KHÔNG lưu trong DB — khai báo tại `constants.ts` của frontend.

const ANNOUNCEMENTS_DATA = [
    {
        title: "Thông báo số 1: Tổ chức Diễn đàn Văn hoá và Giáo dục mùa thu lần thứ ba (AFCE 2026)",
        date: "02/2026",
        content: "Trường Đại học Thủ đô Hà Nội tổ chức Diễn đàn Văn hoá và Giáo dục mùa thu lần thứ ba với chủ đề \"Văn hóa và giáo dục sáng tạo – Giải pháp phát triển bền vững\", quy mô hội thảo khoa học quốc tế. Thời gian dự kiến: tháng 11 năm 2026, tại Trường Đại học Thủ đô Hà Nội (số 98 Dương Quảng Hàm, Quan Hoa, Cầu Giấy, Hà Nội). Diễn đàn tập trung vào ba chủ đề: Văn hóa sáng tạo trong bối cảnh toàn cầu hóa; Giáo dục sáng tạo và phát triển bền vững; Ngôn ngữ trong hệ sinh thái văn hóa và giáo dục sáng tạo. Các báo cáo được chấp nhận sẽ xuất bản trong Kỷ yếu toàn văn có chỉ số ISBN tại Việt Nam. Ban tổ chức trân trọng kính mời các cơ quan, tổ chức, chuyên gia, nhà khoa học, giảng viên, giáo viên, nghiên cứu sinh, học viên cao học và sinh viên tham gia viết bài và tham dự. Toàn văn báo cáo gửi về địa chỉ email afce@hnmu.edu.vn trước ngày 20/8/2026.",
        imageUrl: "https://picsum.photos/seed/afce2026-announcement/800/400",
    },
];

const CO_ORGANIZERS_DATA = [];

const SPONSORS_DATA = [];

const KEYNOTE_SPEAKERS_DATA = [];

const CONFERENCE_TOPICS_DATA = [
  {
    id: 1,
    title: 'Văn hóa sáng tạo trong bối cảnh toàn cầu hóa',
    imageUrl: 'https://picsum.photos/seed/creative-culture/800/600',
    link: '/topic/1',
    description: '<p>Toàn cầu hóa vừa mở ra cơ hội giao lưu, vừa đặt ra thách thức với sự đa dạng và bản sắc văn hóa của mỗi dân tộc. Tiểu ban tập trung thảo luận về nền tảng lý luận, chính sách và các mô hình thực tiễn để văn hóa sáng tạo trở thành động lực phát triển bền vững.</p><p><strong>Các nội dung chính:</strong></p><ul><li>Lý luận về văn hóa sáng tạo trong bối cảnh toàn cầu hóa.</li><li>Chính sách phát triển ngành công nghiệp văn hóa sáng tạo.</li><li>Vai trò của văn hóa sáng tạo trong việc giữ gìn bản sắc dân tộc.</li><li>Tác động của toàn cầu hóa đến sự đa dạng văn hóa.</li><li>Các mô hình thành công về việc kết hợp văn hóa truyền thống với sáng tạo hiện đại.</li><li>Ứng dụng công nghệ trong văn hóa sáng tạo.</li></ul>'
  },
  {
    id: 2,
    title: 'Giáo dục sáng tạo và phát triển bền vững',
    imageUrl: 'https://picsum.photos/seed/creative-education/800/600',
    link: '/topic/2',
    description: '<p>Giáo dục sáng tạo là nền tảng hình thành năng lực thích ứng và giải quyết vấn đề của người học trước những thách thức kinh tế, xã hội và môi trường. Tiểu ban là diễn đàn chia sẻ mô hình, phương pháp và kinh nghiệm quốc tế về giáo dục sáng tạo gắn với mục tiêu phát triển bền vững.</p><p><strong>Các nội dung chính:</strong></p><ul><li>Lý luận về giáo dục sáng tạo và phát triển bền vững.</li><li>Chính sách phát triển giáo dục sáng tạo.</li><li>Đổi mới phương pháp giảng dạy để khuyến khích tư duy sáng tạo.</li><li>Vai trò của giáo dục nghệ thuật, STEAM (Science, Technology, Engineering, Arts, Mathematics).</li><li>Kinh nghiệm quốc tế về giáo dục sáng tạo, các mô hình giáo dục sáng tạo, hệ sinh thái học tập sáng tạo.</li><li>Liên kết giữa giáo dục sáng tạo và năng lực giải quyết các thách thức xã hội: vấn đề kinh tế, xã hội, môi trường...</li></ul>'
  },
  {
    id: 3,
    title: 'Ngôn ngữ trong hệ sinh thái văn hóa và giáo dục sáng tạo',
    imageUrl: 'https://picsum.photos/seed/language-ecosystem/800/600',
    link: '/topic/3',
    description: '<p>Ngôn ngữ là phương tiện kiến tạo và lan tỏa giá trị văn hóa, đồng thời là đối tượng chịu tác động mạnh từ công nghệ số và trí tuệ nhân tạo. Tiểu ban thảo luận vai trò của ngôn ngữ trong hệ sinh thái văn hóa – giáo dục sáng tạo và các hướng nghiên cứu ứng dụng liên quan.</p><p><strong>Các nội dung chính:</strong></p><ul><li>Vai trò của ngôn ngữ trong văn hóa và giáo dục sáng tạo.</li><li>Ngôn ngữ, ngôn ngữ học ứng dụng và sự đa dạng văn hóa.</li><li>Ngôn ngữ trong giáo dục số và truyền thông sáng tạo.</li><li>Ngôn ngữ và công nghệ.</li><li>Ngôn ngữ và giải pháp phát triển bền vững.</li><li>Giáo dục ngôn ngữ; công nghệ trong giáo dục ngôn ngữ.</li><li>Trí tuệ nhân tạo trong giảng dạy ngoại ngữ, ngôn ngữ.</li><li>Đất nước học, quốc tế học; biên phiên dịch và các lĩnh vực liên quan khác.</li></ul>'
  },
];

const DETAILED_PAPER_SUBMISSIONS_DATA = [];

module.exports = {
    ANNOUNCEMENTS_DATA,
    CO_ORGANIZERS_DATA,
    SPONSORS_DATA,
    KEYNOTE_SPEAKERS_DATA,
    CONFERENCE_TOPICS_DATA,
    DETAILED_PAPER_SUBMISSIONS_DATA
};
