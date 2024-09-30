import React, { useState } from 'react'

import Form from 'react-bootstrap/Form';
import axios from 'axios';

function AddProduct() {

     const [formData, setformData] = useState({
        id:"",
        name:"",
        age:"",
        dept:""
     });

     const handleChange = (e) => {
        const { name, value } = e.target; // Correct destructuring of e.target
        setformData({ ...formData, [name]: value });
      };
      
       const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post("http://localhost:8082/addStudent", formData);
          alert("Success");
        } catch (error) {
          alert("Exception occurred");
        }
      };
        



  return (
    <>
    
    <Form onSubmit={handleSubmit} >
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Id</Form.Label>
        <Form.Control type="text" placeholder="enter the id" name='id' onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="enter the name"  name='name' onChange={handleChange}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Age</Form.Label>
        <Form.Control type="text" placeholder="enter the age" name='age' onChange={handleChange}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Dept</Form.Label>
        <Form.Control type="text" placeholder="enter the dept" name='dept' onChange={handleChange}/>
      </Form.Group>

      <button type='submit'> Submit</button>
     
    </Form>
    </>
  )
}

export default AddProduct