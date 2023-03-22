import React, { useState, useEffect, useRef } from 'react';
import './Dropdown.css';

// create a reusable dropdown component
const Dropdown = ({
    options,
    multiple,
    onSelect = () => { },
    value = multiple ? '' : [],
    placeholder = 'Select option(s)',
    search = false,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState(Array.isArray(value) ? value : value ? [value] : []);
    const [searchValue, setSearchValue] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [dropUp, setDropUp] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const updateDropUp = () => {
        const dropdownRect = dropdownRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - dropdownRect.bottom;
        const spaceAbove = dropdownRect.top;
        if (spaceBelow < 300 && spaceAbove > spaceBelow) {
            setDropUp(true);
        } else {
            setDropUp(false);
        }
    }

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
        setFilteredOptions(options.filter((option) => option.toLowerCase().includes(e.target.value.toLowerCase())));
    }

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

    const handlePlaceholder = () => {
        setSelectedOptions([]);
        onSelect([]);
        toggleDropdown();
    }

    const clickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', clickOutside);
        updateDropUp();
        window.addEventListener('resize', updateDropUp);
        return () => {
            document.removeEventListener('click', clickOutside);
            window.addEventListener('resize', updateDropUp);
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
                <div className={`dropdown-body ${dropUp ? 'dropup' : ''}`}>
                    {multiple && (
                        <div className='dropdown-body-actions'>
                            <button onClick={selectAll}>Select All</button>
                            <button onClick={deselectAll}>Deselect All</button>
                        </div>
                    )}
                    {search && (
                        <div className='searchbox'>
                            <input
                                type="text"
                                value={searchValue}
                                onChange={handleSearch}
                                placeholder="Search..."
                            />
                        </div>
                    )}
                    {(!multiple) && (
                        <div
                            className={`dropdown-option placeholder ${!selectedOptions.length ? ' selected' : ''}`}
                            onClick={handlePlaceholder}
                        >
                            {placeholder}
                        </div>
                    )}
                    
                    {filteredOptions.map((option, index) => (
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