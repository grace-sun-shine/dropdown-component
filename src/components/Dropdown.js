import React from 'react';
import './Dropdown.css';

// create a reusable dropdown component
const Dropdown = ({ options, multiple, onSelect}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedOptions, setSelectedOptions] = React.useState([]);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option) => {
        if (!multiple) {
            setSelectedOptions([option]);
            onSelect(option);
            toggleDropdown();
        }else{
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

    return (
        <div className='dropdown'> 
            <div className='dropdown-header' onClick={toggleDropdown}>
            {selectedOptions.length > 0 ? selectedOptions.join(', ') : 'Select option(s)'}
            <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>&#9660;</span>
            </div>
            {isOpen && (
                <div className='dropdown-body'>
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className={`dropdown-option ${selectedOptions.includes(option) ? 'selected' : ''}`}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </div>

                    ))}
                </div>
            )}
        </div>
    );
}

export default Dropdown;