import React, { useState, useRef, useEffect } from 'react';
import './Dropdown.css';

function Dropdown({ 
  options = [], 
  value, 
  onChange, 
  placeholder = 'Select an option',
  disabled = false,
  searchable = false,
  label = '',
  error = '',
  multiple = false,
  maxHeight = '200px'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedValues, setSelectedValues] = useState(multiple ? (value || []) : null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = searchable && searchTerm
    ? options.filter(option => 
        typeof option === 'string' 
          ? option.toLowerCase().includes(searchTerm.toLowerCase())
          : option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  const handleSelect = (option) => {
    const optionValue = typeof option === 'string' ? option : option.value;
    
    if (multiple) {
      const newValues = selectedValues.includes(optionValue)
        ? selectedValues.filter(v => v !== optionValue)
        : [...selectedValues, optionValue];
      setSelectedValues(newValues);
      onChange?.(newValues);
    } else {
      setSelectedValues(optionValue);
      onChange?.(optionValue);
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  const getDisplayValue = () => {
    if (multiple && selectedValues.length > 0) {
      return `${selectedValues.length} selected`;
    }
    if (!multiple && selectedValues) {
      const selected = options.find(opt => 
        (typeof opt === 'string' ? opt : opt.value) === selectedValues
      );
      return typeof selected === 'string' ? selected : selected?.label || selectedValues;
    }
    return placeholder;
  };

  const isSelected = (option) => {
    const optionValue = typeof option === 'string' ? option : option.value;
    return multiple 
      ? selectedValues.includes(optionValue)
      : selectedValues === optionValue;
  };

  return (
    <div className={`dropdown-container ${error ? 'dropdown-error' : ''}`}>
      {label && <label className="dropdown-label">{label}</label>}
      
      <div 
        ref={dropdownRef}
        className={`dropdown ${isOpen ? 'open' : ''} ${disabled ? 'disabled' : ''}`}
      >
        <button
          type="button"
          className="dropdown-toggle"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className="dropdown-value">{getDisplayValue()}</span>
          <span className={`dropdown-arrow ${isOpen ? 'up' : 'down'}`}>▼</span>
        </button>

        {isOpen && (
          <div className="dropdown-menu" style={{ maxHeight }}>
            {searchable && (
              <div className="dropdown-search">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="dropdown-search-input"
                />
              </div>
            )}

            <ul className="dropdown-options" role="listbox">
              {filteredOptions.length === 0 ? (
                <li className="dropdown-option disabled">No options available</li>
              ) : (
                filteredOptions.map((option, index) => {
                  const optionValue = typeof option === 'string' ? option : option.value;
                  const optionLabel = typeof option === 'string' ? option : option.label;
                  const selected = isSelected(option);

                  return (
                    <li
                      key={optionValue || index}
                      className={`dropdown-option ${selected ? 'selected' : ''}`}
                      onClick={() => handleSelect(option)}
                      role="option"
                      aria-selected={selected}
                    >
                      {multiple && (
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => {}}
                          className="dropdown-checkbox"
                        />
                      )}
                      {optionLabel}
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        )}
      </div>

      {error && <span className="dropdown-error-message">{error}</span>}
    </div>
  );
}

export default Dropdown;
