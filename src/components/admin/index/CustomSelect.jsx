import React, { useState, useRef, useEffect } from "react";
import "./CustomSelect.css";

const CustomSelect = ({
  placeholder = "Chọn",
  value,
  onChange,
  options = [],
  allowClear = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const selectRef = useRef(null);

  // Find label from value
  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || placeholder;

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle option click
  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  // Handle clear
  const handleClear = (e) => {
    e.stopPropagation();
    onChange(null);
  };

  return (
    <div className="custom-select-wrapper">
      <div
        ref={selectRef}
        className={`custom-select ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`custom-select-value ${
            value ? "selected" : "placeholder"
          }`}
        >
          {selectedLabel}
        </span>
        <div className="custom-select-icons">
          {value && allowClear && (
            <button
              className="custom-select-clear"
              onClick={handleClear}
              type="button"
              title="Xóa"
            >
              ✕
            </button>
          )}
          <span className="custom-select-arrow">▼</span>
        </div>
      </div>

      {isOpen && options.length > 0 && (
        <div
          ref={dropdownRef}
          className="custom-select-dropdown"
          onClick={(e) => e.stopPropagation()}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className={`custom-select-option ${
                option.value === value ? "selected" : ""
              }`}
              onClick={() => handleSelect(option.value)}
            >
              {option.value === value && (
                <span className="custom-select-checkmark">✓</span>
              )}
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
