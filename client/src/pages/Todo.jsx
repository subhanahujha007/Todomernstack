import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
const Todo = (data)=> {
  const [todos, setTodos] = useState([]);

const deleteTask=async(id)=>{try {
    const response=await axios.delete(`http://localhost:8000/api/auth/deletetask/${id}`)

const x=todos.filter((i)=>{
return (i._id!=id)
})
setTodos(x)
} catch (error) {
    console.error(error)
} 

}
async function fetchdata(){await axios.get("http://localhost:8000/api/auth/gettask")  
.then(response => {
  const {  data} = response.data;

    if (Array.isArray(data)) {
      setTodos(data);
    } else {
      console.error('Invalid response format. Expected an array.');
    }
  
}

)
.catch(error => {
  console.error('Error fetching todos:', error);
});}

  useEffect(() => {
    try {
        fetchdata()
    } catch (error) {
      console.error(error)
    }
  }, [data]); 
  const checktodo = async (userid, checked) => {
    const value={
      userid,checked
    }
    const updatedTodos = todos.map(todo =>
      todo._id === userid ? { ...todo, checked } : todo
    );
    setTodos(updatedTodos);
     
    try {
      
      const response = await axios.post(`http://localhost:8000/api/auth/updatetask/${userid}`, value );
      
    }
    
     catch (error) {
      console.error('Error updating task:', error);
    }
  
    
   
  };
  return (
    <div style={{gap:"10px",justifyContent:"space-evenly",flexWrap:"wrap",marginTop:"10px",display:"flex"}}>
     
      {todos.map(todo => (
        
          <div style={{display:'flex',flexDirection:'row',border:"2px solid black",borderRadius:"30px"}} key={todo._id}>
            <div style={{display:'flex',flexDirection:'column',width:"95%"}}>
            <h1>{todo.title}</h1>
            {todo.description && <p>{todo.description}</p>}
            </div >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',paddingLeft:'3rem' }}>
            <Button style={{width:"100px",height:"20px",marginRight:"30px",padding:"2rem",backgroundColor:todo.checked ? 'red' : 'blue' }} variant="contained" onClick={()=>{checktodo(todo._id,!todo.checked)}}>{todo.checked ? 'complete' : 'incomplete'}</Button>
            <Button style={{width:"100px",height:"20px",marginRight:"30px",padding:"2rem"}} onClick={()=>{ deleteTask(todo._id)}} variant="contained">delete</Button>
            </div>
          </div>
         
        ))}
      
    </div>
  );
};

export default Todo;

