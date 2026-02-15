
import { useState } from 'react';

function Input({
  type = 'text',
  label,
  placeholder,
  value: controlledValue,
  onChange,
  onBlur,
  error,
  helperText,
  required = false,
  disabled = false,
  maxLength,
  pattern,
  icon,
  className = ''
}) {
  const [value, setValue] = useState(controlledValue || '');
  const [isFocused, setIsFocused] = useState(false);
  const [touched, setTouched] = useState(false);

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : value;

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (!isControlled) {
      setValue(newValue);
    }
    if (onChange) {
      onChange(e);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    setTouched(true);
    if (onBlur) {
      onBlur(e);
    }
  };

  const showError = touched && error;

  return (
    <div className={`input-wrapper ${className}`}>
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      )}
      
      <div className={`input-container ${isFocused ? 'focused' : ''} ${showError ? 'error' : ''} ${disabled ? 'disabled' : ''}`}>
        {icon && <span className="input-icon">{icon}</span>}
        
        <input
          type={type}
          className="input-field"
          placeholder={placeholder}
          value={currentValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          required={required}
          maxLength={maxLength}
          pattern={pattern}
        />
      </div>

      {(showError || helperText) && (
        <div className={`input-message ${showError ? 'error' : ''}`}>
          {showError ? error : helperText}
        </div>
      )}
    </div>
  );
}

export default Input;
