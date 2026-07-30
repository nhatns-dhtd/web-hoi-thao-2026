import React from 'react';

/**
 * Ô nhập liệu và nhãn.
 *
 * Thay cho cặp hằng `inputStyles` / `labelStyles` đang bị chép tay ở 5 file
 * (AdminPage ×2, AnnouncementsPage, PaperReviewPage, LoginPage) — mỗi bản lệch
 * nhau một chút, sửa màu phải nhớ đủ cả 5 chỗ.
 *
 * Hai tone vì repo thật đang có hai loại nền ô nhập:
 * - `solid`: ô nằm trong modal (nền đục)
 * - `panel`: ô nằm trực tiếp trên panel nội dung (nền mờ, có màu placeholder riêng)
 */
export type FieldTone = 'solid' | 'panel';

const TONE: Record<FieldTone, string> = {
  solid: 'bg-field',
  panel: 'bg-field-soft placeholder-stone-400',
};

const base = (tone: FieldTone) =>
  `mt-1 block w-full px-3 py-2 ${TONE[tone]} border border-line-strong rounded-md shadow-xs ` +
  'focus:outline-hidden focus:ring-amber-500 focus:border-amber-500';

type WithTone<P> = P & { tone?: FieldTone };

export const Input: React.FC<WithTone<React.InputHTMLAttributes<HTMLInputElement>>> = ({
  tone = 'solid', className = '', ...rest
}) => <input className={`${base(tone)} ${className}`.trim()} {...rest} />;

export const TextArea: React.FC<WithTone<React.TextareaHTMLAttributes<HTMLTextAreaElement>>> = ({
  tone = 'solid', className = '', ...rest
}) => <textarea className={`${base(tone)} ${className}`.trim()} {...rest} />;

export const Select: React.FC<WithTone<React.SelectHTMLAttributes<HTMLSelectElement>>> = ({
  tone = 'solid', className = '', children, ...rest
}) => (
  <select className={`${base(tone)} ${className}`.trim()} {...rest}>
    {children}
  </select>
);

export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({
  className = '', children, ...rest
}) => (
  <label className={`block text-sm font-medium text-ink ${className}`.trim()} {...rest}>
    {children}
  </label>
);
