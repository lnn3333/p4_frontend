import React, { useState } from "react";
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import SelectComponent from "./SelectComponent";
import Lifestyle from "./Lifestyle";

const Match = () => {
  const initialOptions = [
    { key: 1, value: 'Coffee Date' },
    { key: 2, value: 'Dinner at a Nice Restaurant' },
    { key: 3, value: 'Movie Night' },
    { key: 4, value: 'Escape Room Challenge' },
    { key: 5, value: 'Street Food Adventure' },
    { key: 6, value: 'Rooftop Bar Experience' },
    { key: 7, value: 'Visit Nguyen Hue Walking Street' },
    { key: 8, value: 'Saigon River Cruise' },
    { key: 9, value: 'Study Date' },
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
      const response = await fetch('http://localhost:3001/matchData', {
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
        navigate("/lifestyle");
      } else {
        console.error('Error saving data:', data.message);
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }

  return (
    <React.Fragment>
      <Link to='/lifestyle'></Link>
      <Routes>
        <Route path="/lifestyle" element={<Lifestyle />} />
      </Routes>
      <div className='main-container'>
        <span className='text'> Your top <br />
        first 3 dates <br />
        </span>

        <form onSubmit={handleSubmit} method="post" action="/matchData">
          {[1, 2, 3].map((index) => (
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
           <button type="submit" className="btn-2" >Last One</button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Match;
