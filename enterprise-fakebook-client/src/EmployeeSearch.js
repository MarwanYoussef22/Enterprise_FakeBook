import React, { useState } from 'react';
import Employee from './Employee';

function EmployeeSearch(props) {
  const { onSelectEmployee } = props;
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);

    fetch(`/search-name/${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search employees..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch} disabled={loading}>
        Search
      </button>

      {loading && <p>Loading...</p>}

      {searchResults.length ? searchResults.map(employee => (
        <Employee
          key={employee.id}
          onEmployeeClick={onSelectEmployee}
          id={employee.id}
          firstName={employee.first_name}
          lastName={employee.last_name}
          phoneNumber={employee.phone_number}
          job={employee.job_role}
          location={employee.work_location}
          managerID={employee.manager_id}
          photoUrl={employee.photo_url}
        />
      )) : null}

      {searchResults.length === 0 && !loading && <p>No results found.</p>}
    </div>
  );
}
export default EmployeeSearch;