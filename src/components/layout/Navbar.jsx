import { Link } from "react-router-dom";
import { useContext, useState } from "react";

import { signOut } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { AuthContext } from "../../context/authProvider";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully");
    } catch (err) {
      console.error("Logout Error:", err);
    }
  };

  return (
    <nav className="bg-green-600 text-white px-6 py-4 flex justify-between items-center relative">
      <Link to="/" className="text-2xl font-bold">
        Recipe Book
      </Link>

      <div className="flex items-center gap-4">
        <Link to="/">Home</Link>
        <Link to="/all-recipes">All Recipes</Link>
        <Link to="/add-recipe">Add Recipe</Link>
        <Link to="/my-recipes">My Recipes</Link>

        {!user ? (
          <>
            <Link
              to="/login"
              className="bg-white text-green-600 px-3 py-1 rounded"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-white text-green-600 px-3 py-1 rounded"
            >
              Register
            </Link>
          </>
        ) : (
          <div className="relative">
            <img
              src={
                user.photoURL ||
                "https://i.ibb.co.com/WvvqDyH2/islamul-net2.jpg"
              }
              alt={user.displayName}
              className="w-10 h-10 rounded-full cursor-pointer"
              title={user.displayName}
              onClick={() => setShowDropdown(!showDropdown)}
            />

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-10">
                <p className="px-4 py-2 border-b">{user.displayName}</p>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
