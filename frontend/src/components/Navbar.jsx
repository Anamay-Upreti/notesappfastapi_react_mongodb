import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-black text-white shadow-md">
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        NotesApp 
      </h1>
      <div className="space-x-4">
        <button
          onClick={logout}
          className="bg-white cursor-pointer hover:bg-red-100 px-4 py-2 rounded-md transition text-black font-bold"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
