import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import API from "../../utils/axios";
import Loader from "../../components/common/Loader";
import MaidNavbar from "../../components/layout/MaidNavbar";
import { Calendar, CheckCircle, Clock } from "lucide-react";

const MaidDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await API.get("/maid/dashboard");
        setData(res.data);
      } catch {
        setData({
          name: user?.full_name || "Provider",
          upcoming: 0,
          pending: 0,
          completed: 0,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [user?.full_name]);

  if (loading) return <Loader />;

  const stats = [
    {
      label: "NEW REQUESTS",
      value: data?.pending ?? 0,
      sub: "Awaiting your response",
      icon: <Clock size={22} className="text-amber-500" />,
      bg: "bg-amber-100",
    },
    {
      label: "UPCOMING",
      value: data?.upcoming ?? 0,
      sub: "Confirmed bookings",
      icon: <Calendar size={22} className="text-emerald-700" />,
      bg: "bg-emerald-100",
    },
    {
      label: "COMPLETED",
      value: data?.completed ?? 0,
      sub: "Total services done",
      icon: <CheckCircle size={22} className="text-stone-400" />,
      bg: "bg-stone-100",
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      <MaidNavbar />
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-stone-900 mb-1">
          Welcome, {data?.name || user?.full_name}!
        </h1>
        <p className="text-stone-500 mb-10">
          Manage your bookings and grow your service business
        </p>

        <div className="grid grid-cols-3 gap-6 mb-8">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-xl border border-stone-200 p-6 flex justify-between items-start"
            >
              <div>
                <p className="text-xs font-semibold text-stone-400 tracking-widest mb-2">
                  {s.label}
                </p>
                <p className="text-4xl font-bold text-stone-900 mb-1">
                  {s.value}
                </p>
                <p className="text-sm text-stone-500">{s.sub}</p>
              </div>
              <div
                className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center`}
              >
                {s.icon}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Link
            to="/maid/bookings"
            className="bg-emerald-900 text-white rounded-xl p-8 hover:bg-emerald-800 transition"
          >
            <Calendar size={36} className="mb-4 opacity-80" />
            <h3 className="text-xl font-bold mb-1">View All Bookings</h3>
            <p className="text-emerald-200 text-sm">
              Manage all your incoming and past service requests
            </p>
          </Link>
          <Link
            to="/maid/profile"
            className="bg-white border border-stone-200 rounded-xl p-8 hover:border-emerald-300 hover:shadow-md transition"
          >
            <CheckCircle
              size={36}
              className="mb-4 text-emerald-800 opacity-70"
            />
            <h3 className="text-xl font-bold text-stone-900 mb-1">
              Update Profile
            </h3>
            <p className="text-stone-500 text-sm">
              Edit your services, rates, and availability
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MaidDashboard;
