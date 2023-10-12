import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import SalaryPrediction from './SalaryPrediction';
import SignIn from './SignIn';
import EmployeeSearch from './EmployeeSearch';
import EmployeeProfile from './EmployeeProfile';

function App() {
  const [idLoggedIn, setIdLoggedIn] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

useEffect(() => {
  console.log('idLoggedIn: ', idLoggedIn);
}, [idLoggedIn])

  return (
    <Routes>
      {/* a navigation bar, search bar, preshown 10 */}
      <Route path="/" element={<SignIn onSignIn={setIdLoggedIn}/>} />
      <Route path="/salary-prediction" element={<SalaryPrediction />} />
      <Route path="/search" element={<EmployeeSearch onSelectEmployee={setSelectedEmployee}/>} />
      <Route path="/search/employee" element={<EmployeeProfile signedInEmployee={idLoggedIn} choosenEmployee={selectedEmployee} />} />
      {/* Define other routes here */}
    </Routes>
  );
}

export default App;
