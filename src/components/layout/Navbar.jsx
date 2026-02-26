import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Home } from "lucide-react";

const Navbar = () => {
  const { user } = useAuth();
  return (
    <nav className="bg-white border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Home size={24} className="text-emerald-900" />
          <span className="text-xl font-bold text-emerald-900">
            FindMyHouseHelp
          </span>
        </Link>
        {user ? (
          <Link
            to={`/${user.role}/dashboard`}
            className="bg-emerald-900 text-white px-6 py-2 rounded-full hover:bg-emerald-800 transition"
          >
            Go to Dashboard
          </Link>
        ) : (
          <div className="flex gap-4 items-center">
            <Link
              to="/login"
              className="text-stone-700 hover:text-emerald-900 font-medium"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-emerald-900 text-white px-6 py-2 rounded-full hover:bg-emerald-800 transition"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
