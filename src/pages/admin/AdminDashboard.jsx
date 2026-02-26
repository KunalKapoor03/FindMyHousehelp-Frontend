import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/axios";
import AdminNavbar from "../../components/layout/AdminNavbar";
import Loader from "../../components/common/Loader";
import {
  Users,
  ShieldCheck,
  Calendar,
  DollarSign,
  Clock,
  Headphones,
} from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get("/admin/stats");
        setStats(res.data);
      } catch {
        setStats({
          totalCustomers: 0,
          totalMaids: 0,
          totalBookings: 0,
          pendingApprovals: 0,
          completedBookings: 0,
          openTickets: 0,
          totalRevenue: 0,
        });
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return <Loader />;

  const cards = [
    {
      label: "Total Customers",
      value: stats.totalCustomers,
      icon: <Users size={22} className="text-blue-600" />,
      bg: "bg-blue-50",
      link: "/admin/customers",
    },
    {
      label: "Total Maids",
      value: stats.totalMaids,
      icon: <ShieldCheck size={22} className="text-emerald-600" />,
      bg: "bg-emerald-50",
      link: "/admin/maids",
    },
    {
      label: "Total Bookings",
      value: stats.totalBookings,
      icon: <Calendar size={22} className="text-purple-600" />,
      bg: "bg-purple-50",
      link: "/admin/bookings",
    },
    {
      label: "Pending Approvals",
      value: stats.pendingApprovals,
      icon: <Clock size={22} className="text-amber-600" />,
      bg: "bg-amber-50",
      link: "/admin/maids",
    },
    {
      label: "Total Revenue",
      value: `₹${stats.totalRevenue}`,
      icon: <DollarSign size={22} className="text-green-600" />,
      bg: "bg-green-50",
      link: "/admin/bookings",
    },
    {
      label: "Open Tickets",
      value: stats.openTickets,
      icon: <Headphones size={22} className="text-red-500" />,
      bg: "bg-red-50",
      link: "/admin/support",
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      <AdminNavbar />
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-stone-900 mb-1">
          Admin Dashboard
        </h1>
        <p className="text-stone-500 mb-10">
          Overview of FindMyHouseHelp platform
        </p>
        <div className="grid grid-cols-3 gap-6">
          {cards.map((c) => (
            <Link
              to={c.link}
              key={c.label}
              className="bg-white rounded-xl border border-stone-200 p-6 flex justify-between items-start hover:shadow-md transition"
            >
              <div>
                <p className="text-sm text-stone-500 mb-2">{c.label}</p>
                <p className="text-3xl font-bold text-stone-900">{c.value}</p>
              </div>
              <div
                className={`w-10 h-10 rounded-lg ${c.bg} flex items-center justify-center`}
              >
                {c.icon}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
