import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Dropdown.css';

// create a reusable dropdown component
const Dropdown = ({ options, multiple, onSelect, value, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState(Array.isArray(value) ? value : value ? [value]: []);
    const dropdownRef = useRef(null);

    Dropdown.propTypes = {
        options: PropTypes.array.isRequired,
        multiple: PropTypes.bool,
        onSelect: PropTypes.func,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string)
          ]),
        placeholder: PropTypes.string,
      };
      
    Dropdown.defaultProps = {
        multiple: false,
        onSelect: () => {},
        value: [placeholder],
        placeholder: 'Select option(s)',
      };
    
    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option) => {
        if (!multiple) {
            setSelectedOptions([option]);
            onSelect(option);
            toggleDropdown();
        } else {
            let newSelectedOptions;
            if (selectedOptions.includes(option)) {
                newSelectedOptions = selectedOptions.filter((item) => item !== option)
                setSelectedOptions(newSelectedOptions);
                onSelect(newSelectedOptions);
            } else {
                newSelectedOptions = [...selectedOptions, option];
                setSelectedOptions(newSelectedOptions);
                onSelect(newSelectedOptions);
            }
        }
    }

    const selectAll = () => {
        setSelectedOptions(options);
        onSelect(options);
    }

    const deselectAll = () => {
        setSelectedOptions([]);
        onSelect([]);
    }

    const clickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', clickOutside);
        return () => {
            document.removeEventListener('click', clickOutside);
        }
    }, []);

    return (
        <div className='dropdown' ref={dropdownRef}>
            <div className={`dropdown-header ${isOpen ? 'open' : ''}`} onClick={toggleDropdown}>
                <div className="dropdown-header-text">
                    {selectedOptions.length > 0 ? selectedOptions.join(', ') : placeholder}
                </div>
                <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>&#9660;</span>
            </div>
            {isOpen && (
                <div className='dropdown-body'>
                    {multiple && (
                        <div className='dropdown-body-actions'>
                            <button onClick={selectAll}>Select All</button>
                            <button onClick={deselectAll}>Deselect All</button>
                        </div>
                    )}
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className={`dropdown-option ${selectedOptions.includes(option) ? 'selected' : ''}`}
                            onClick={() => handleOptionClick(option)}
                        >
                            {multiple && (
                                <input
                                    type='checkbox'
                                    checked={selectedOptions.includes(option)}
                                    onChange={() => handleOptionClick(option)}
                                />
                            )}
                            {option}
                        </div>

                    ))}
                </div>
            )}
        </div>
    );
}

export default Dropdown;