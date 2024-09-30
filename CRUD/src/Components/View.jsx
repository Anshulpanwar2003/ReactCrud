import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

function View() {
  const [selStudent, setselStudent] = useState({
    id: "",
    name: "",
    age: "",
    dept: ""
  });
  const [students, setstudents] = useState([]);
  const [isform, setisform] = useState(false);

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const url = "http://localhost:8082/getStudent";
      const response = await axios.get(url);
      setstudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const deleteStudent = async (id) => {
    const url = `http://localhost:8082/del/${id}`;
    await axios.delete(url);
    fetchStudent();
  };

  const handleUpdate = (student) => {
    setselStudent(student);
    setisform(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setselStudent({ ...selStudent, [name]: value });
  };

  const update = async (e) => {
    e.preventDefault();
    const url = "http://localhost:8082/updateStudent";
    await axios.post(url, selStudent);
    setisform(false);
    fetchStudent();
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>First Name</th>
            <th>age</th>
            <th>dept</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.dept}</td>
              <td><button onClick={() => deleteStudent(student.id)}>delete</button></td>
              <td><button onClick={() => handleUpdate(student)}>update</button></td>
            </tr>
          ))}
        </tbody>
      </Table>

      {isform && (
        <Form onSubmit={update}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Id</Form.Label>
            <Form.Control type="text" placeholder="enter the id" name='id' value={selStudent.id} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="enter the name" name='name' value={selStudent.name} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Age</Form.Label>
            <Form.Control type="text" placeholder="enter the age" name='age' value={selStudent.age} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Dept</Form.Label>
            <Form.Control type="text" placeholder="enter the dept" name='dept' value={selStudent.dept} onChange={handleChange} />
          </Form.Group>

          <button type='submit'>Submit</button>
        </Form>
      )}
    </>
  );
}

export default View;
