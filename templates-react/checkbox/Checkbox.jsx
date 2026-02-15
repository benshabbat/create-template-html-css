
import './Checkbox.css';
import { useState } from 'react';

function Checkbox({ 
  label = '',
  checked = false,
  onChange,
  disabled = false,
  indeterminate = false,
  name = '',
  value = '',
  error = '',
  helperText = '',
  size = 'medium',
  color = 'primary'
}) {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = (e) => {
    const newValue = e.target.checked;
    setIsChecked(newValue);
    onChange?.(newValue, e);
  };

  const checkboxId = `checkbox-${name || Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`checkbox-container ${error ? 'checkbox-error' : ''}`}>
      <div className="checkbox-wrapper">
        <div className={`checkbox-input-wrapper ${size}`}>
          <input
            id={checkboxId}
            type="checkbox"
            className={`checkbox-input ${color}`}
            checked={isChecked}
            onChange={handleChange}
            disabled={disabled}
            name={name}
            value={value}
            aria-invalid={!!error}
            aria-describedby={error ? `${checkboxId}-error` : helperText ? `${checkboxId}-helper` : undefined}
          />
          <span 
            className={`checkbox-custom ${isChecked ? 'checked' : ''} ${indeterminate ? 'indeterminate' : ''}`}
            aria-hidden="true"
          >
            {indeterminate && !isChecked ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="5" y1="12" x2="19" y2="12" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            ) : isChecked ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="20 6 9 17 4 12" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : null}
          </span>
        </div>

        {label && (
          <label htmlFor={checkboxId} className="checkbox-label">
            {label}
          </label>
        )}
      </div>

      {helperText && !error && (
        <span id={`${checkboxId}-helper`} className="checkbox-helper-text">
          {helperText}
        </span>
      )}

      {error && (
        <span id={`${checkboxId}-error`} className="checkbox-error-message">
          {error}
        </span>
      )}
    </div>
  );
}

export default Checkbox;
