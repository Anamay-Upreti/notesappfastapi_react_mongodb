import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";

const App = () => {
  return (
   <Router>
      <Routes>
        <Route path="/" element={<SignUp/>} />
        <Route path="/notes" element={<Login/>} />
        <Route path="/login" element={<Dashboard/>} />
      </Routes>
   </Router>
  )
}

export default App