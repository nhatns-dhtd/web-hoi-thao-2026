import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg text-gray-800">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-blue-700">Về Hội thảo</h1>
      <div className="space-y-4 text-lg text-gray-700">
        <p>
            Chào mừng đến với Hội thảo quốc tế về nghiên cứu giáo dục. Đây là một diễn đàn học thuật uy tín, nơi các nhà nghiên cứu, nhà giáo dục, nhà quản lý và các chuyên gia từ khắp nơi trên thế giới cùng nhau gặp gỡ, chia sẻ những phát hiện mới nhất, thảo luận về các thách thức và định hình tương lai của ngành giáo dục.
        </p>
        <p>
            <strong>Mục đích:</strong> Hội thảo nhằm mục đích thúc đẩy sự phát triển của khoa học giáo dục thông qua việc công bố các công trình nghiên cứu chất lượng cao, tạo môi trường hợp tác và trao đổi học thuật, và kết nối lý thuyết với thực tiễn để giải quyết các vấn đề cấp bách trong giáo dục hiện nay.
        </p>
        <p>
            <strong>Tầm quan trọng:</strong> Trong bối cảnh toàn cầu hóa và cuộc cách mạng công nghiệp lần thứ tư, giáo dục đóng vai trò then chốt trong việc phát triển nguồn nhân lực chất lượng cao và xây dựng một xã hội bền vững. Hội thảo là cơ hội quý báu để cập nhật các xu hướng tiên tiến, học hỏi kinh nghiệm quốc tế và đề xuất các giải pháp sáng tạo cho giáo dục Việt Nam và thế giới.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
