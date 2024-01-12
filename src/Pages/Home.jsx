import React, { useState } from "react";
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import Personality from "./Personality";
import SelectComponent from "./SelectComponent";
//import "./style.css";
import "./Home.css";
import axios from "axios";

const options = [
  { key: "1", value: "Aries" },
  { key: "2", value: "Taurus" },
  { key: "3", value: "Gemini" },
  { key: "4", value: "Cancer" },
  { key: "5", value: "Leo" },
  { key: "6", value: "Virgo" },
  { key: "7", value: "Libra" },
  { key: "8", value: "Scorpio" },
  { key: "9", value: "Sagittarius" },
  { key: "10", value: "Capricorn" },
  { key: "11", value: "Aquarius" },
  { key: "12", value: "Pisces" },
];

const optionsGender = [
  { key: "1", value: "Female" },
  { key: "2", value: "Male" },
  { key: "3", value: "Others" },
];

const Home = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: '',
    gender: '',
    horoscope: '',
  });

  const [selectedGender, setSelectedGender] = useState('');
  const [selectedHoroscope, setSelectedHoroscope] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  }

  const handleGenderChange = (item) => {
    setInput((prevInput) => ({
      ...prevInput,
      gender: item,
    }));
    setSelectedGender(item);
  };

  const handleHoroscopeChange = (item) => {
    setInput((prevInput) => ({
      ...prevInput,
      horoscope: item,
    }));
    setSelectedHoroscope(item);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      title: input.title,
      gender: selectedGender,
      horoscope: selectedHoroscope,
    };

    console.log(input);
  
    try {
      const response = await axios.post('http://localhost:3001/home_add', formData);
      console.log(response.data);
      navigate("/personality");
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  


  return (
    <React.Fragment>
      <Link to="/personality"></Link>
      <Routes>
        <Route path="/personality" element={<Personality />} />
      </Routes>
      <div className='main-container'>
        <span className='text'>Find your match</span>
  <form className= "menu" onSubmit={handleSubmit}>

    <input className="form-control"
      onChange={handleChange}
      name="title"
      value={input.title}
      autoComplete="off"
      placeholder="Your Gmail"
    />
      <div className="menu-item">
    <SelectComponent
      options={options}
      placeholder={"Your Horoscope"}
      onChange={(item) => handleHoroscopeChange(item)}
      selectedOption={selectedHoroscope}
    />
    <SelectComponent 
      options={optionsGender}
      placeholder={"Your Gender"}
      onChange={(item) => handleGenderChange(item)}
      selectedOption={selectedGender}
    />
  </div>

  
  <button type="submit" className="btn-2" >Next One!!</button>
</form>

        
      </div>
    </React.Fragment>
  );
};

export default Home;
