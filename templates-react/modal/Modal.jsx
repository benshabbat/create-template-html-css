import React, { useState } from 'react';
import './Modal.css';

/**
 * Modal Component
 * A flexible modal dialog component
 */
const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children,
  footer,
  showCloseButton = true,
  closeOnOverlayClick = true,
  size = 'medium'
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className={`modal-content modal-${size}`}>
        <div className="modal-header">
          {title && <h2 className="modal-title">{title}</h2>}
          {showCloseButton && (
            <button className="modal-close" onClick={onClose} aria-label="Close">
              ×
            </button>
          )}
        </div>
        <div className="modal-body">
          {children}
        </div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
