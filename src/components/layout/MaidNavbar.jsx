import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Home, Calendar, User, LogOut } from "lucide-react";

const MaidNavbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/maid/dashboard" className="flex items-center gap-2">
          <Home size={24} className="text-emerald-900" />
          <span className="text-xl font-bold text-emerald-900">
            FindMyHouseHelp
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <Link
            to="/maid/bookings"
            className="flex items-center gap-1.5 text-stone-600 hover:text-emerald-900 transition text-sm font-medium"
          >
            <Calendar size={16} />
            My Bookings
          </Link>
          <Link
            to="/maid/profile"
            className="flex items-center gap-1.5 text-stone-600 hover:text-emerald-900 transition text-sm font-medium"
          >
            <User size={16} />
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-stone-400 hover:text-red-500 transition text-sm"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default MaidNavbar;
