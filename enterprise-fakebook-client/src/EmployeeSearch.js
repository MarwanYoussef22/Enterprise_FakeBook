import React, { useState, useEffect } from 'react';
import Employee from './Employee';
import './EmployeeSearch.css';

function EmployeeSearch(props) {
  const { onSelectEmployee } = props;
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

useEffect(() => {
  fetchData('g');
}, [])

const fetchData = async (searchText) => {
  setLoading(true);

    await fetch(`/search-name/${searchText}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
}

  const handleSearch = async () => {
    fetchData(searchQuery);
  };

  return (
    <div className= "employee-search-container">
      <input
        className="employee-search-input"
        type="text"
        placeholder="Search employees..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        className="employee-search-button"
        onClick={handleSearch}
        disabled={loading}
      >
        Search
      </button>

      {loading && <p className="loading-message">Loading...</p>}

      <ul className="search-results">
      {searchResults.length ? searchResults.map(employee => (
        <li key={employee.id} className="search-result-item">
        <Employee
          key={employee.id}
          onEmployeeClick={onSelectEmployee}
          id={employee.id}
          firstName={employee.first_name}
          lastName={employee.last_name}
          job={employee.job_role}
          location={employee.work_location}
          photoUrl={employee.photo_url}
        />
        </li>
      )) : null}
      </ul>
    
      {searchResults.length === 0 && !loading && <p className="no-results-message">No results found.</p>}
    </div>
  );
}
export default EmployeeSearch;