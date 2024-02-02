// Home.js
import React, { useState,useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Todo from "./Todo.jsx"
const HomeWrapper = styled.div`
  display: flex;
  align-items: flex-start; /* Align items to the top */
  justify-content: center;
  min-height: 100vh;
  background-color: #3498db; /* Blue background color */
`;

const FormContainer = styled(motion.div)`
background-color: grey;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 100%;
  width: 95%;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #bdc3c7; /* Border color */
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: 10px;
`;

const Button = styled(motion.button)`
  background-color: #2ecc71; /* Green button color */
  color: #fff;
  width:200px;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Home = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [data, setData] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/auth/createtask", formData);
      // Fetch data after successfully submitting the form
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/auth/gettask");
      setData(response.data.data || []);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };
  const removedata=(e)=>{
e.preventDefault()
localStorage.clear()
  }
  const navigate=useNavigate()

  useEffect(() => {
    if (!localStorage.getItem("todouser")) {
      // Redirect to login if user is not authenticated
      navigate("/login");
    }
  }, []);

  return (
    <HomeWrapper>
    
      <FormContainer
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      ><div style={{display:"flex",flexDirection:"row"}}>  <h1 style={{width:"90%"}}>TODO-APP</h1>
      <Button  onClick={(e)=>removedata(e)} style={{width:"100px",height:"30px"}}><Link style={{textDecoration:'none'}} to="/Login">LOGOUT</Link></Button></div>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </FormGroup>

          <FormGroup>
            <Input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </FormGroup>

          <Button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="submit"
          >
            Submit
          </Button>
        </form>
        
     <Todo data={data} />
      </FormContainer>
    </HomeWrapper>
  );
};

export default Home;
