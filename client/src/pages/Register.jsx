

import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import styled from 'styled-components';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
const RegisterFormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #2c3e50; /* Dark background color */
`;

const RegisterForm = styled.form`
  background-color: #34495e; /* Darker form background color */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
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

const Button = styled.button`
  background-color: #27ae60; /* Green button color */
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px; /* Add margin to separate button from input fields */
`;

const LinkButton = styled.button`
  background-color: #3498db;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left:6rem;
`;

const RegisterFormComponent = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
      });
    const navigate=useNavigate()
      
      const handlechange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      const submithandler = async (e) => {
        e.preventDefault();
    
        try {
          const apiEndpoint = process.env.REGISTER;
          const response = await axios.post(apiEndpoint, formData);
          
          if(response){
           
            const userdata=JSON.stringify(response.data)
            localStorage.setItem("todouser",userdata)
            navigate("/")
          }
        } catch (error) {
          
          console.error('Error:', error);
        }
      };
    
  return (
    <RegisterFormWrapper>
      <RegisterForm onSubmit={submithandler}>
        <FormGroup>
          <Label htmlFor="username">Username:</Label>
          <Input onChange={(event)=>handlechange(event)} type="text" id="username" name="username" />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">Email:</Label>
          <Input onChange={(event)=>handlechange(event)}type="email" id="email" name="email" />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">Password:</Label>
          <Input onChange={(event)=>handlechange(event)}type="password" id="password" name="password" />
        </FormGroup>

        <Button type="submit">Register</Button>

        <LinkButton ><Link to="/login" style={{"textDecoration":"none",color:"white",fontSize:"1rem"}}>Go to Login Page</Link></LinkButton>
      </RegisterForm>
    </RegisterFormWrapper>
  );
};

export default RegisterFormComponent;
