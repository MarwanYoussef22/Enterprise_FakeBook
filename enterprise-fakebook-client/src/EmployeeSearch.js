import React, { useState } from 'react';

function EmployeeSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);
  
    fetch(`/search/${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        // Filter the data based on the search query
        const filteredResults = data.filter((employee) => {
          const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
          return fullName.includes(searchQuery.toLowerCase());
        });
  
        setSearchResults(filteredResults);
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

    {searchResults.length > 0 && (
      <ul>
        {searchResults.map((employee) => (
          <li key={employee.id}>
            {employee.name} - {employee.jobRole}
          </li>
        ))}
      </ul>
    )}

    {searchResults.length === 0 && !loading && <p>No results found.</p>}
  </div>
);
}
export default EmployeeSearch;