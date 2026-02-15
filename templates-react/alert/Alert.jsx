
import { useState } from 'react';

function Alert({
  type = 'info',
  title,
  children,
  onClose,
  dismissible = true,
  icon: customIcon,
  className = ''
}) {
  const [isVisible, setIsVisible] = useState(true);

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  if (!isVisible) {
    return null;
  }

  const icon = customIcon !== undefined ? customIcon : icons[type];

  return (
    <div className={`alert alert-${type} ${className}`} role="alert">
      <div className="alert-content">
        {icon && (
          <span className="alert-icon">{icon}</span>
        )}
        
        <div className="alert-text">
          {title && <div className="alert-title">{title}</div>}
          {children && <div className="alert-message">{children}</div>}
        </div>
      </div>

      {dismissible && (
        <button
          className="alert-close"
          onClick={handleClose}
          aria-label="Close alert"
        >
          ×
        </button>
      )}
    </div>
  );
}

export default Alert;
