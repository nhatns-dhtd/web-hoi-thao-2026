import React from 'react';

const conferenceTopics = [
    "Công nghệ trong giáo dục và học tập số (EdTech & Digital Learning)",
    "Đổi mới phương pháp giảng dạy và kiểm tra đánh giá",
    "Phát triển chương trình giáo dục theo định hướng năng lực",
    "Giáo dục STEM và liên ngành",
    "Tâm lý học đường và sức khỏe tinh thần",
    "Quản lý giáo dục và chính sách",
    "Giáo dục hòa nhập và công bằng xã hội",
    "Học tập suốt đời và phát triển kỹ năng nghề nghiệp",
    "Toàn cầu hóa và quốc tế hóa giáo dục",
    "Văn hóa và giáo dục sáng tạo trong kỷ nguyên số",
];


const TopicsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg text-gray-800">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-blue-700">Chủ đề chính của Hội thảo</h1>
      <p className="text-center text-gray-600 mb-8">
        Hội thảo tập trung vào các lĩnh vực nghiên cứu đa dạng và cấp thiết trong giáo dục hiện đại.
      </p>
      <ul className="space-y-3">
        {conferenceTopics.map((topic, index) => (
            <li key={index} className="flex items-start p-3 bg-gray-50 rounded-md">
                <i className="fas fa-lightbulb text-yellow-500 mt-1 mr-4"></i>
                <span className="text-lg text-gray-700">{topic}</span>
            </li>
        ))}
      </ul>
    </div>
  );
};

export default TopicsPage;
