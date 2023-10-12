import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import SalaryPrediction from './SalaryPrediction';
import SignIn from './SignIn';
import EmployeeSearch from './EmployeeSearch';

function App() {
  return (
    <Routes>
      {/* a navigation bar, search bar, preshown 10 */}
      <Route path="/" element={<SignIn />} />
      <Route path="/salary-prediction" element={<SalaryPrediction />} />
      <Route path="/EmployeeSearch" element={<EmployeeSearch />} />
      {/* Define other routes here */}
    </Routes>
  );
}

export default App;
