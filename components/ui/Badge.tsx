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
  green: 'bg-green-100 text-green-800 border border-green-300',
  red: 'bg-red-100 text-red-800 border border-red-300',
  sky: 'bg-sky-100 text-sky-800 border border-sky-300',
  emerald: 'bg-emerald-100 text-emerald-800 border border-emerald-300',
  indigo: 'bg-indigo-100 text-indigo-800 border border-indigo-300',
  amber: 'bg-amber-100 text-amber-800 border border-amber-300',
  stone: 'bg-stone-100 text-stone-700 border border-stone-300',
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
