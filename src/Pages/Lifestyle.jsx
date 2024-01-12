
import Final from "./final"
import React, { useState } from "react";
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import SelectComponent from "./SelectComponent";
import "./style.css";
import "./Home.css";

const Lifestyle = () => {
    const options = [
        { key: "1", value: "Family-Centric Lifestyle" },
        { key: "2", value: "Social Lifestyle" },
        { key: "3", value: "Health and Wellness Lifestyle" },
        { key: "4", value: "Outdoor Enthusiast Lifestyle" },
        { key: "5", value: "Foodie Lifestyle" },
        { key: "6", value: "Tech Enthusiast Lifestyle" },
      ];
    const navigate = useNavigate();
    const [selectedOption, setSelected] = useState('');
    const [input, setInput] = useState({
        life: '',
      });
    const handleChange = (item) => {
        setInput((prevInput) => ({
          ...prevInput,
          life: item,
        }));
        setSelected(item);
      };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
          life: selectedOption,
        };
    
        console.log(input);
      
        try {
            const response = await fetch('http://localhost:3001/life', {
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
                navigate("/final");
              } else {
                console.error('Error saving data:', data.message);
              }
        } catch (error) {
          console.error('Error submitting form:', error);
        }
      };
    return (
        <React.Fragment>
            <Link to= '/final'> </Link>
            <Routes>
            <Route path = "/final" element={<Final />}></Route>
            </Routes>
            <div className='main-container'>
            <span className='text'>Lifestyle</span>
            <form onSubmit={handleSubmit}>
            <div className="menu-item">
            <SelectComponent 
                options={options}
                placeholder={"Describe your lifestyle"}
                onChange={(item) => handleChange(item)}
                selectedOption={selectedOption}
            />
            </div>
             <button type="submit" className="btn-2" >Done ^^</button>
            </form>
            </div>
        </React.Fragment>
    
    )
};
export default Lifestyle
