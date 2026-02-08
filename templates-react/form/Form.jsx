import React, { useState } from 'react';
import './Form.css';

/**
 * Form Component
 * A flexible form component with validation
 */
const Form = ({ 
  title = 'Form',
  fields = [],
  onSubmit,
  submitButtonText = 'Submit'
}) => {
  const [formData, setFormData] = useState(() => {
    const initialData = {};
    fields.forEach(field => {
      initialData[field.name] = field.defaultValue || '';
    });
    return initialData;
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateField = (field, value) => {
    if (field.required && !value) {
      return `${field.label} is required`;
    }
    
    if (field.pattern && value && !field.pattern.test(value)) {
      return field.errorMessage || `Invalid ${field.label.toLowerCase()}`;
    }
    
    if (field.minLength && value.length < field.minLength) {
      return `${field.label} must be at least ${field.minLength} characters`;
    }
    
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    fields.forEach(field => {
      const error = validateField(field, formData[field.name]);
      if (error) {
        newErrors[field.name] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit?.(formData);
  };

  const renderField = (field) => {
    const commonProps = {
      id: field.name,
      name: field.name,
      value: formData[field.name] || '',
      onChange: handleChange,
      required: field.required,
      placeholder: field.placeholder
    };

    switch (field.type) {
      case 'textarea':
        return <textarea {...commonProps} rows={field.rows || 4} />;
      case 'select':
        return (
          <select {...commonProps}>
            <option value="">Select...</option>
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      default:
        return <input type={field.type || 'text'} {...commonProps} />;
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">{title}</h2>
      <form onSubmit={handleSubmit} className="form">
        {fields.map(field => (
          <div key={field.name} className="form-group">
            <label htmlFor={field.name} className="form-label">
              {field.label}
              {field.required && <span className="required">*</span>}
            </label>
            {renderField(field)}
            {errors[field.name] && (
              <span className="form-error">{errors[field.name]}</span>
            )}
          </div>
        ))}
        <button type="submit" className="form-submit">
          {submitButtonText}
        </button>
      </form>
    </div>
  );
};

export default Form;
