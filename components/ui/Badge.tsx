import React from 'react';

/**
 * Chip trạng thái / phân loại.
 *
 * BẮT BUỘC dùng bảng tra tĩnh, KHÔNG ghép chuỗi kiểu `bg-${tone}-900/70`:
 * Tailwind quét source bằng văn bản thuần, class ghép động sẽ không có mặt
 * trong CSS xuất ra và chip sẽ hiện ra trắng trơn.
 *
 * Đây là màu NGỮ NGHĨA (duyệt/không duyệt/chờ, chủ đề 1/2/3) nên cố ý tách khỏi
 * token thương hiệu — đổi theme không được làm chúng lẫn vào nhau.
 */
export type BadgeTone = 'green' | 'red' | 'sky' | 'emerald' | 'indigo' | 'amber' | 'stone';

const TONE: Record<BadgeTone, string> = {
  green: 'bg-green-900/70 text-green-300 border border-green-700',
  red: 'bg-red-900/70 text-red-300 border border-red-700',
  sky: 'bg-sky-900/70 text-sky-300 border border-sky-700',
  emerald: 'bg-emerald-900/70 text-emerald-300 border border-emerald-700',
  indigo: 'bg-indigo-900/70 text-indigo-300 border border-indigo-700',
  amber: 'bg-amber-900/60 text-amber-300 border border-amber-700',
  stone: 'bg-stone-700/60 text-stone-100 border border-stone-600',
};

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone: BadgeTone;
}

const Badge: React.FC<BadgeProps> = ({ tone, className = '', children, ...rest }) => (
  <span className={`${TONE[tone]} ${className}`.trim()} {...rest}>
    {children}
  </span>
);

export { TONE as BADGE_TONE };
export default Badge;
