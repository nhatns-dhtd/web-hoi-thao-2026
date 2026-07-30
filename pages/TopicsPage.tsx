import React from 'react';

const conferenceTopics = [
  {
    title: "Văn hóa sáng tạo trong bối cảnh toàn cầu hóa",
    subTopics: [
      "Lý luận về văn hóa sáng tạo trong bối cảnh toàn cầu hóa.",
      "Chính sách phát triển ngành công nghiệp văn hóa sáng tạo.",
      "Vai trò của văn hóa sáng tạo trong việc giữ gìn bản sắc dân tộc.",
      "Tác động của toàn cầu hóa đến sự đa dạng văn hóa.",
      "Các mô hình thành công về việc kết hợp văn hóa truyền thống với sáng tạo hiện đại.",
      "Ứng dụng công nghệ trong văn hóa sáng tạo.",
    ],
  },
  {
    title: "Giáo dục sáng tạo và phát triển bền vững",
    subTopics: [
      "Lý luận về giáo dục sáng tạo và phát triển bền vững.",
      "Chính sách phát triển giáo dục sáng tạo.",
      "Đổi mới phương pháp giảng dạy để khuyến khích tư duy sáng tạo.",
      "Vai trò của giáo dục nghệ thuật, STEAM (Science, Technology, Engineering, Arts, Mathematics).",
      "Kinh nghiệm quốc tế về giáo dục sáng tạo, các mô hình giáo dục sáng tạo, hệ sinh thái học tập sáng tạo.",
      "Liên kết giữa giáo dục sáng tạo và năng lực giải quyết các thách thức xã hội: vấn đề kinh tế, xã hội, môi trường...",
    ],
  },
  {
    title: "Ngôn ngữ trong hệ sinh thái văn hóa và giáo dục sáng tạo",
    subTopics: [
      "Vai trò của ngôn ngữ trong văn hóa và giáo dục sáng tạo.",
      "Ngôn ngữ, ngôn ngữ học ứng dụng và sự đa dạng văn hóa.",
      "Ngôn ngữ trong giáo dục số và truyền thông sáng tạo.",
      "Ngôn ngữ và công nghệ.",
      "Ngôn ngữ và giải pháp phát triển bền vững.",
      "Giáo dục ngôn ngữ; công nghệ trong giáo dục ngôn ngữ.",
      "Trí tuệ nhân tạo trong giảng dạy ngoại ngữ, ngôn ngữ.",
      "Đất nước học, quốc tế học; biên phiên dịch và các lĩnh vực liên quan khác.",
    ],
  },
];

const TopicsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-stone-800/40 backdrop-blur-xs p-8 rounded-xl shadow-xl border border-stone-700/50 text-stone-100">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-amber-100">Chủ đề chính của Diễn đàn</h1>
      <p className="text-center text-stone-300 mb-8">
        Diễn đàn tập trung vào ba nhóm chủ đề chính dưới đây.
      </p>
      <div className="space-y-8">
        {conferenceTopics.map((topic, index) => (
          <section key={index}>
            <h2 className="text-xl font-bold text-amber-100 mb-3 flex items-start">
              <i className="fas fa-lightbulb text-amber-500 mt-1 mr-3"></i>
              <span>{index + 1}. {topic.title}</span>
            </h2>
            <ul className="space-y-2 ml-9">
              {topic.subTopics.map((subTopic, subIndex) => (
                <li key={subIndex} className="flex items-start p-3 bg-stone-900/50 rounded-md">
                  <i className="fas fa-angle-right text-amber-400 mt-1.5 mr-3"></i>
                  <span className="text-stone-200">{subTopic}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
};

export default TopicsPage;
