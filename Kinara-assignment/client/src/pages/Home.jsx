import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import './Home.css'

const Home = () => {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [nameFilter, setNameFilter] = useState('');

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await axios.get(`http://localhost:8800/api/StudentDetails?page=${page}&pageSize=${pageSize}&nameContains=${nameFilter}`);
        setStudents(response.data.students);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    }

    fetchStudents();
  }, [page, pageSize, nameFilter]);

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  return (
    <div className="container">
      <h1 className="HeadingText">Student Details</h1>
      <div className="searchBox">
        <label htmlFor="nameFilter">Filter by Name:</label>
        <input
        className="inputField"
          id="nameFilter"
          type="text"
          value={nameFilter}
          onChange={handleNameFilterChange}
        />
      </div>
      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
<div className="buttonContainer">
      <button class="button-69" role="button"  onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
      <button class="button-69" role="button"  onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}

export default Home;
