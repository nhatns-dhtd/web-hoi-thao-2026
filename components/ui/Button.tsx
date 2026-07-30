import React from 'react';

/**
 * Nút bấm. Bốn biến thể tương ứng bốn vai trò đang dùng trong repo:
 * - primary: hành động chính (Lưu, Đăng nhập, Thêm…)
 * - secondary: hành động phụ / Huỷ
 * - danger: xoá
 * - success: thêm mới ở trang Admin
 *
 * `danger`/`success` cố ý KHÔNG dùng token thương hiệu: chúng là màu ngữ nghĩa,
 * phải giữ nguyên nghĩa đỏ/xanh kể cả khi bảng màu theme đổi.
 */
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

const VARIANT: Record<ButtonVariant, string> = {
  primary: 'text-white bg-brand hover:bg-brand-hover',
  // Xám trung tính, cố ý không dùng token thương hiệu.
  secondary: 'text-stone-800 bg-stone-200 hover:bg-stone-300',
  danger: 'text-white bg-red-600 hover:bg-red-700',
  success: 'text-white bg-green-600 hover:bg-green-700',
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', className = '', children, ...rest }) => (
  <button className={`${VARIANT[variant]} ${className}`.trim()} {...rest}>
    {children}
  </button>
);

export default Button;
