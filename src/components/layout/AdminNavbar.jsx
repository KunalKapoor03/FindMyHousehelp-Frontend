import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Home,
  Users,
  Calendar,
  Star,
  Headphones,
  LogOut,
  ShieldCheck,
} from "lucide-react";

const AdminNavbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { to: "/admin/dashboard", label: "Dashboard", icon: <Home size={16} /> },
    { to: "/admin/customers", label: "Customers", icon: <Users size={16} /> },
    { to: "/admin/maids", label: "Maids", icon: <ShieldCheck size={16} /> },
    { to: "/admin/bookings", label: "Bookings", icon: <Calendar size={16} /> },
    { to: "/admin/reviews", label: "Reviews", icon: <Star size={16} /> },
    { to: "/admin/support", label: "Support", icon: <Headphones size={16} /> },
  ];

  return (
    <nav className="bg-white border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/admin/dashboard" className="flex items-center gap-2">
          <Home size={24} className="text-emerald-900" />
          <span className="text-xl font-bold text-emerald-900">
            FindMyHouseHelp
          </span>
          <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2 py-0.5 rounded-full ml-1">
            Admin
          </span>
        </Link>
        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition ${location.pathname === item.to ? "bg-emerald-50 text-emerald-900" : "text-stone-500 hover:text-emerald-900 hover:bg-stone-50"}`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-2 text-stone-400 hover:text-red-500 transition text-sm ml-2"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
