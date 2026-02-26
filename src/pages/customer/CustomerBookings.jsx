import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/axios";
import Loader from "../../components/common/Loader";
import CustomerNavbar from "../../components/layout/CustomerNavbar";
import { Calendar, Search } from "lucide-react";

const STATUS_COLORS = {
  pending: "bg-amber-100 text-amber-800",
  accepted: "bg-emerald-100 text-emerald-800",
  completed: "bg-stone-100 text-stone-600",
  cancelled: "bg-red-100 text-red-700",
  rejected: "bg-red-100 text-red-700",
};

const CustomerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get("/customer/bookings");
        setBookings(res.data);
      } catch {
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-stone-50">
      <CustomerNavbar />
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-stone-900 mb-1">My Bookings</h1>
        <p className="text-stone-500 mb-8">Track all your service bookings</p>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-16 text-center">
            <Calendar size={48} className="text-stone-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-stone-700 mb-2">
              No bookings yet
            </h3>
            <p className="text-stone-400 mb-6">
              You haven't booked any services yet
            </p>
            <Link
              to="/customer/find-help"
              className="bg-emerald-900 text-white px-6 py-2.5 rounded-full font-medium hover:bg-emerald-800 transition inline-flex items-center gap-2"
            >
              <Search size={16} /> Find Help
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    Service Provider
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-stone-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-semibold text-sm">
                          {b.maid_name?.[0]}
                        </div>
                        <div>
                          <p className="font-medium text-stone-800">
                            {b.maid_name}
                          </p>
                          <p className="text-xs text-stone-400">
                            {b.maid_phone}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-stone-600">
                      {b.service || "—"}
                    </td>
                    <td className="px-6 py-4 text-stone-500 text-sm">
                      {b.date
                        ? new Date(b.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "—"}
                    </td>
                    <td className="px-6 py-4 text-stone-700 font-medium">
                      {b.total_charge ? `₹${b.total_charge}` : "—"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${STATUS_COLORS[b.status] || STATUS_COLORS.pending}`}
                      >
                        {b.status === "accepted" ? "Upcoming" : b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerBookings;
