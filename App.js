import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file for styling

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://reqres.in/api/users?page=2');
      const modifiedData = response.data.data.map((employee, index) => ({
        ...employee,
        id: (index + 1).toString().padStart(3, '0'), // Format the ID as a three-digit number
      }));
      setEmployees(modifiedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Employee List</h1>
      <input
        type="text"
        placeholder="Search by first name"
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      <ul className="employee-list">
        {filteredEmployees.map((employee) => (
          <li key={employee.id} className="employee-item">
            <div className="employee-id">ID: {employee.id}</div>
            <img src={employee.avatar} alt={employee.first_name} className="avatar" />
            <div className="employee-name">Name: {employee.first_name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
