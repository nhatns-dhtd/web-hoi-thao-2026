import React from 'react';

/**
 * Panel nội dung. Component chỉ sở hữu phần BỀ MẶT (nền + viền + blur) — đúng phần
 * thay đổi khi lật theme. Bo góc / padding / shadow vẫn truyền qua `className` vì
 * mỗi trang một khác; gom cả chúng vào đây sẽ phải đẻ ra hàng loạt prop biến thể.
 *
 * `raised` là panel nổi trên nền trang, `sunken` là hộp lõm nằm bên trong panel.
 */
export type CardTone = 'raised' | 'sunken';

const TONE: Record<CardTone, string> = {
  raised: 'bg-surface backdrop-blur-xs border border-line/50',
  sunken: 'bg-surface-sunken border border-line/50',
};

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: CardTone;
}

const Card: React.FC<CardProps> = ({ tone = 'raised', className = '', children, ...rest }) => (
  <div className={`${TONE[tone]} ${className}`.trim()} {...rest}>
    {children}
  </div>
);

export default Card;
