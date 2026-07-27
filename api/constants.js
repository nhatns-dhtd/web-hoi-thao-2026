const NAV_LINKS = [
  { id: 1, name: "Trang chủ", path: "/" },
  { id: 2, name: "Giới thiệu", path: "/introduction" },
  { id: 3, name: "Chương trình", path: "/schedule" },
  { id: 4, name: "Thông báo", path: "/announcements" },
  { id: 5, name: "Đăng ký & Nộp bài", path: "/participation-guide" },
  { id: 6, name: "Kết quả duyệt bài", path: "/paper-review" },
  { id: 7, name: "Admin", path: "/admin" },
];

const ANNOUNCEMENTS_DATA = [
    { id: 1, title: "Gia hạn thời gian nộp bài báo", date: "15/08/2025", content: "Do nhận được nhiều yêu cầu, ban tổ chức quyết định gia hạn thời gian nộp bài báo toàn văn đến hết ngày 30/09/2025. Vui lòng xem chi tiết tại trang Call for Papers.", imageUrl: "https://picsum.photos/seed/announcement1/800/400" },
    { id: 2, title: "Công bố danh sách diễn giả chính", date: "01/08/2025", content: "Chúng tôi vinh dự công bố danh sách các diễn giả chính sẽ tham gia hội thảo, bao gồm các chuyên gia hàng đầu trong và ngoài nước. Chi tiết về các diễn giả và chủ đề bài nói sẽ được cập nhật trong trang Chương trình.", imageUrl: "https://picsum.photos/seed/announcement2/800/400" },
    { id: 3, title: "Mở cổng đăng ký sớm với giá ưu đãi", date: "15/07/2025", content: "Cổng đăng ký tham dự hội thảo đã chính thức mở. Đăng ký sớm trước ngày 15/09/2025 để nhận được mức phí ưu đãi. Xin vui lòng truy cập trang Đăng ký để biết thêm chi tiết.", imageUrl: "https://picsum.photos/seed/announcement3/800/400" },
];

const CO_ORGANIZERS_DATA = [
    { id: 1, name: "Tạp chí Giáo dục", logoUrl: "https://picsum.photos/seed/coorganizer1/150/60" },
];

const SPONSORS_DATA = [
    { id: 1, name: "Báo Kinh tế - Đô thị", logoUrl: "https://picsum.photos/seed/sponsor1/150/60" },
    { id: 2, name: "Nhà xuất bản Hà Nội", logoUrl: "https://picsum.photos/seed/sponsor2/150/60" },
];


const KEYNOTE_SPEAKERS_DATA = [
  { id: 1, name: "GS. TS. Lê Minh Trí", affiliation: "Đại học Quốc gia", imageUrl: "https://picsum.photos/seed/speaker1/200/200", bio: "Chuyên gia hàng đầu về trí tuệ nhân tạo trong giáo dục, với hơn 20 năm kinh nghiệm nghiên cứu và giảng dạy.", keynoteTopic: "AI và Tương lai của Việc học Cá nhân hóa" },
  { id: 2, name: "PGS. TS. Trần Thị Bích", affiliation: "Viện Khoa học Giáo dục", imageUrl: "https://picsum.photos/seed/speaker2/200/200", bio: "Tác giả của nhiều công trình nghiên cứu về đổi mới phương pháp giảng dạy và kiểm tra đánh giá.", keynoteTopic: "Đánh giá Năng lực: Từ Lý thuyết đến Thực tiễn" },
  { id: 3, name: "Dr. John Williams", affiliation: "Đại học Stanford", imageUrl: "https://picsum.photos/seed/speaker3/200/200", bio: "Nhà nghiên cứu tiên phong trong lĩnh vực công nghệ giáo dục và học tập kết hợp (blended learning).", keynoteTopic: "Xây dựng Hệ sinh thái Học tập Số" },
];

const CONFERENCE_TOPICS_DATA = [
  { 
    id: 1, 
    title: 'Bản sắc văn hoá trong kỷ nguyên số', 
    imageUrl: 'https://picsum.photos/seed/culture-digital/800/600', 
    link: '/topic/1',
    description: 'Trong bối cảnh toàn cầu hóa và sự phát triển mạnh mẽ của công nghệ số, việc giữ gìn và phát huy bản sắc văn hóa dân tộc trở nên cấp thiết hơn bao giờ hết. Tiểu ban sẽ tập trung thảo luận về các giải pháp để văn hóa thực sự trở thành nền tảng tinh thần, động lực phát triển của xã hội, từ việc số hóa di sản, xây dựng các sản phẩm văn hóa số, đến việc giáo dục và nâng cao nhận thức cho thế hệ trẻ về giá trị văn hóa truyền thống.' 
  },
  { 
    id: 2, 
    title: 'Giáo dục sáng tạo và phát triển bền vững trong kỷ nguyên số', 
    imageUrl: 'https://picsum.photos/seed/education-creative/800/600', 
    link: '/topic/2',
    description: 'Kỷ nguyên số đòi hỏi một nền giáo dục không chỉ truyền thụ kiến thức mà còn phải khơi dậy tiềm năng sáng tạo, tư duy phản biện và khả năng thích ứng của người học. Tiểu ban này sẽ là diễn đàn để các chuyên gia chia sẻ các mô hình giáo dục tiên tiến, phương pháp giảng dạy đổi mới, và các chiến lược tích hợp công nghệ nhằm tạo ra một môi trường học tập linh hoạt, hiệu quả, hướng tới sự phát triển bền vững của cá nhân và xã hội.' 
  },
  { 
    id: 3, 
    title: 'Trí tuệ nhân tạo trong bảo tồn, phát triển văn hoá và giáo dục', 
    imageUrl: 'https://picsum.photos/seed/ai-future/800/600', 
    link: '/topic/3',
    description: 'Trí tuệ nhân tạo (AI) đang mở ra những cơ hội và thách thức chưa từng có cho các lĩnh vực văn hóa và giáo dục. Tiểu ban sẽ khám phá các ứng dụng của AI trong việc phân tích dữ liệu lớn để cá nhân hóa lộ trình học tập, tự động hóa các tác vụ quản lý, bảo tồn di sản văn hóa thông qua công nghệ 3D và thực tế ảo, cũng như thảo luận về các vấn đề đạo đức và chính sách cần thiết để đảm bảo việc ứng dụng AI một cách có trách nhiệm và hiệu quả.' 
  },
];

const DETAILED_PAPER_SUBMISSIONS_DATA = [
    { id: 1, authorName: 'Nguyễn Văn An', organization: 'Đại học Quốc gia', paperTitle: 'Ứng dụng AI trong đánh giá kết quả học tập', topic: 3, abstractStatus: 'Duyệt', fullTextStatus: 'Duyệt', reviewStatus: 'Duyệt', presentationStatus: 'Trình bày' },
    { id: 2, authorName: 'Trần Thị Bình', organization: 'Viện Khoa học Giáo dục', paperTitle: 'Mô hình Blended Learning cho giáo dục đại học', topic: 2, abstractStatus: 'Duyệt', fullTextStatus: 'Duyệt', reviewStatus: 'Duyệt', presentationStatus: 'Trình bày' },
    { id: 3, authorName: 'Lê Văn Cường', organization: 'Đại học Sư phạm', paperTitle: 'Tác động của STEM đến tư duy sáng tạo', topic: 2, abstractStatus: 'Duyệt', fullTextStatus: 'Đang chờ duyệt', reviewStatus: 'Đang chờ duyệt', presentationStatus: 'Không trình bày' },
];

module.exports = {
    NAV_LINKS,
    ANNOUNCEMENTS_DATA,
    CO_ORGANIZERS_DATA,
    SPONSORS_DATA,
    KEYNOTE_SPEAKERS_DATA,
    CONFERENCE_TOPICS_DATA,
    DETAILED_PAPER_SUBMISSIONS_DATA
};
