import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import CustomerLogin from './components/CustomerLogin/CustomerLogin';
import CustomerRegistration from './components/CustomerRegistration/CustomerRegistration';
import CustomerPasswordReset from "./components/CustomerPasswordReset/CustomerPasswordReset";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<CustomerLogin />} />
      <Route path="/register" element={<CustomerRegistration />} />
      <Route path="/forgot-password" element={<CustomerPasswordReset />} />

    </Routes>
  );
}

export default App;