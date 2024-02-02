// Install required libraries using: npm install styled-components framer-motion react-router-dom
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #2c3e50; /* Dark background color */
`;

const LoginForm = styled(motion.form)`
  background-color: #34495e; /* Darker form background color */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #ecf0f1; /* Light text color */
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #2c3e50; /* Border color */
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #2c3e50; /* Dark input background color */
  color: #ecf0f1; /* Light text color */
`;

const Button = styled(motion.button)`
  background-color: #27ae60; /* Green button color */
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px; /* Add margin to separate button from input fields */
`;

const LinkButton = styled(Link)`
  display: inline-block;
  background-color: #3498db;
  color: #fff;
  padding: 10px 15px;
  border: none;
  margin-left:2rem;
  border-radius: 4px;
  text-decoration: none;
  margin-top: 10px;
`;

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
const navigate=useNavigate()
useEffect(() => {
  const user=JSON.parse(localStorage.getItem("todouser"))
  if(user){
    navigate("/")
  }
}, [])


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
    const response=await axios.post("http://localhost:8000/api/auth/login",formData)
    
      
      if(response.data){
      localStorage.setItem("todouser",JSON.stringify(response.data))
        navigate("/")
      }
      else{
        alert("user doent exits")
      }

    } catch (error) {
    console.error(error)      
    }
  };

  return (
    <LoginPageWrapper>
      <LoginForm
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
      >
        <h2>Login</h2>
        <FormGroup>
          <Label htmlFor="username">Username:</Label>
          <Input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">Password:</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </FormGroup>

        <Button type="submit">Submit</Button>

        <LinkButton to="/register">Go to Register Page</LinkButton>
      </LoginForm>
    </LoginPageWrapper>
  );
};

export default LoginPage;
