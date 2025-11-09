import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";

const App = () => {
  return (
   <Router>
      <Routes>
        <Route path="/" element={<SignUp/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
   </Router>
  )
}

export default App