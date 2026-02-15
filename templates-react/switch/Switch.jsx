
import './Switch.css';
import { useState } from 'react';

function Switch({ 
  checked = false,
  onChange,
  disabled = false,
  size = 'medium',
  color = 'primary',
  label = '',
  labelPosition = 'right',
  loading = false,
  icons = null,
  name = '',
  id,
  className = ''
}) {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = (e) => {
    if (disabled || loading) return;
    
    const newValue = e.target.checked;
    setIsChecked(newValue);
    onChange?.(newValue, e);
  };

  const switchId = id || `switch-${name || Math.random().toString(36).substr(2, 9)}`;

  const switchClasses = [
    'switch',
    `switch-${size}`,
    `switch-${color}`,
    isChecked ? 'switch-checked' : '',
    disabled ? 'switch-disabled' : '',
    loading ? 'switch-loading' : '',
    className
  ].filter(Boolean).join(' ');

  const labelClasses = [
    'switch-label',
    labelPosition === 'left' ? 'switch-label-left' : 'switch-label-right',
    disabled ? 'switch-label-disabled' : ''
  ].filter(Boolean).join(' ');

  const renderIcons = () => {
    if (!icons) return null;
    
    return (
      <span className="switch-icon">
        {isChecked ? icons.checked : icons.unchecked}
      </span>
    );
  };

  const switchElement = (
    <div className={switchClasses}>
      <input
        id={switchId}
        type="checkbox"
        className="switch-input"
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled || loading}
        name={name}
        role="switch"
        aria-checked={isChecked}
        aria-label={label || undefined}
      />
      <span className="switch-slider">
        {loading ? (
          <span className="switch-spinner"></span>
        ) : (
          renderIcons()
        )}
      </span>
    </div>
  );

  if (!label) {
    return switchElement;
  }

  return (
    <label htmlFor={switchId} className="switch-wrapper">
      {labelPosition === 'left' && (
        <span className={labelClasses}>{label}</span>
      )}
      {switchElement}
      {labelPosition === 'right' && (
        <span className={labelClasses}>{label}</span>
      )}
    </label>
  );
}

export default Switch;
