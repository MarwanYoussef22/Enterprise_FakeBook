import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import SalaryPrediction from './SalaryPrediction';
import SignIn from './SignIn';

function App() {
  return (
    <Routes>
      {/* a navigation bar, search bar, preshown 10 */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/salary-prediction" element={<SalaryPrediction />} />
      {/* Define other routes here */}
    </Routes>
  );
}

export default App;
