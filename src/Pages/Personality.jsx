import React, { useState } from "react";
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import Match from "./Match";
import SelectComponent from "./SelectComponent";

const Personality = () => {
  const initialOptions = [
    { key: 1, value: 'Communication' },
    { key: 2, value: 'Empathy' },
    { key: 3, value: 'Respect' },
    { key: 4, value: 'Trustworthiness' },
    { key: 5, value: 'Shared Values' },
    { key: 6, value: 'Flexibility' },
    { key: 7, value: 'Humor' },
    { key: 8, value: 'Interests' },
    { key: 9, value: 'Independence' },
    { key: 10, value: 'Conflict Resolution' },
    { key: 11, value: 'Affection Intimacy' },
  ];

  const navigate = useNavigate();

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [availableOptions, setAvailableOptions] = useState(initialOptions);


  function handleSelectChange(selectedOption) {
    // Check if the option is already selected
    if (!selectedOptions.includes(selectedOption)) {
      setSelectedOptions([...selectedOptions, selectedOption]);

      // Remove the selected option from the available options list
      setAvailableOptions((prevOptions) => prevOptions.filter(opt => opt.key !== selectedOption));
    }
  }

  function handleRemoveOption(selectedOption) {
    // Remove the selected option from the selected options list
    setSelectedOptions((prevOptions) => prevOptions.filter(opt => opt !== selectedOption));

    // Add the selected option back to the available options list
    const removedOption = selectedOptions.find(opt => opt === selectedOption);
    if (removedOption) {
      setAvailableOptions((prevOptions) => [...prevOptions, removedOption]);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = {
      traits: selectedOptions,
    };
    try {
      const response = await fetch('https://p4-backend-rmkb.onrender.com/userData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        console.log('Data saved successfully.');
        console.log(data);
        navigate("/match");
      } else {
        console.error('Error saving data:', data.message);
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }
  return (
    <React.Fragment>
      <Link to='/match'></Link>
      <Routes>
        <Route path="/match" element={<Match />} />
      </Routes>
      <div className='main-container'>
        <span className='text'>What is your values</span>

        <form onSubmit={handleSubmit} method="post" action="/userData">
          {[1, 2, 3, 4, 5].map((index) => (
            <div className="menu-item">
            <SelectComponent 
              key={index}
              options={availableOptions}
              placeholder={"Click to select"}
              onChange={(item) => handleSelectChange(item)}
              selectedOptions={selectedOptions}
              onRemove={(item) => handleRemoveOption(item)}
            />
            </div>
          ))}
           <button type="submit" className="btn-2" >Almost there !!</button>
        </form>

      </div>
    </React.Fragment>
  );
};

export default Personality;
