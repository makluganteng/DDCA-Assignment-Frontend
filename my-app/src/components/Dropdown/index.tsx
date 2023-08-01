import React, { useState } from "react";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const options = ["Option 1", "Option 2", "Option 3", "Option 4"]; // You can customize the options here

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="px-4 py-2 bg-blue-500 text-white rounded focus:outline-none"
      >
        Select an Option
      </button>
      {isOpen && (
        <div className="absolute top-10 right-0 mt-2 bg-white shadow-lg rounded">
          {options.map((option) => (
            <button
              key={option}
              className="block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left"
              onClick={() => {
                console.log("Selected Option:", option);
                setIsOpen(false);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
