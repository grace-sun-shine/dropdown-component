import React, { useState, useEffect, useRef } from 'react';
import { FixedSizeList as List } from 'react-window';
import { AutoSizer } from 'react-virtualized';
import './Dropdown.css';

const ITEM_HEIGHT = 40;

// create a reusable dropdown component
const Dropdown = ({
    options,
    isMulti,
    onSelect = () => { },
    value = isMulti ? '' : [],
    placeholder = 'Select option(s)',
    search = false,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState(Array.isArray(value) ? value : value ? [value] : []);
    const [searchValue, setSearchValue] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [dropUp, setDropUp] = useState(false);
    const dropdownRef = useRef(null);

    const listHeight = Math.min(200, filteredOptions.length * ITEM_HEIGHT);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const updateDropUp = () => {
        if (dropdownRef.current) {
            const dropdownRect = dropdownRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - dropdownRect.bottom;
            const spaceAbove = dropdownRect.top;
            if (spaceBelow < 300 && spaceAbove > spaceBelow) {
                setDropUp(true);
            } else {
                setDropUp(false);
            }
        }
    }

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
        setFilteredOptions(options.filter((option) => option.toLowerCase().includes(e.target.value.toLowerCase())));
    }

    const handleOptionClick = (e, option) => {
        e.stopPropagation();

        if (!isMulti) {
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
        if (dropdownRef.current && !dropdownRef.current.contains(event.target) && event.target.type !== "checkbox") {
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

    const Row = ({ index, style }) => {
        const option = filteredOptions[index];
        return (
            <div
                style={style}
                className={`dropdown-option ${selectedOptions.includes(option) ? 'selected' : ''}`}
                onClick={(e) => handleOptionClick(e, option)}
            >
                {isMulti && (
                        <input
                            type='checkbox'
                            checked={selectedOptions.includes(option)}
                            onChange = {() => {}}
                            onClick={(e) => handleOptionClick(e, option)}
                        />
                )}
                {option}
            </div>
        )
    };

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
                    {isMulti && (
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
                    {(!isMulti) && (
                        <div
                            className={`dropdown-option placeholder ${!selectedOptions.length ? ' selected' : ''}`}
                            onClick={handlePlaceholder}
                        >
                            {placeholder}
                        </div>
                    )}
                    <AutoSizer disableHeight>
                        {({ width }) => (
                            <List
                                height={listHeight}
                                itemCount={filteredOptions.length}
                                itemSize={ITEM_HEIGHT}
                                width={width}
                            >
                                {Row}
                            </List>
                        )}
                    </AutoSizer>
                </div>
            )}
        </div>
    );
}

export default Dropdown;