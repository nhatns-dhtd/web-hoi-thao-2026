import React from 'react';

/**
 * Khung modal: lớp phủ tối + hộp nội dung, đóng khi bấm ra ngoài.
 *
 * Dùng `onMouseDown` chứ không phải `onClick` cho lớp phủ — giữ đúng hành vi cũ:
 * bôi đen chữ trong hộp rồi thả chuột ra ngoài sẽ KHÔNG làm đóng modal.
 *
 * Lớp phủ cố ý vẫn tối kể cả ở theme sáng: nhiệm vụ của nó là dìm nền phía sau.
 */
interface ModalProps {
  onClose: () => void;
  /** Class cho hộp nội dung (bề rộng, padding, bo góc). */
  className?: string;
  /** Class cho lớp phủ, khi cần độ tối hoặc blur khác mặc định. */
  scrimClassName?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, className = '', scrimClassName = 'bg-black/60', children }) => (
  <div
    className={`fixed inset-0 z-50 flex justify-center items-center p-4 ${scrimClassName}`}
    onMouseDown={onClose}
  >
    <div
      className={`bg-surface-raised border border-line ${className}`.trim()}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  </div>
);

export default Modal;
