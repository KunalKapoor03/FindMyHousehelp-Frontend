import { useEffect, useState } from "react";
import API from "../../utils/axios";
import Loader from "../../components/common/Loader";
import MaidNavbar from "../../components/layout/MaidNavbar";
import { Calendar } from "lucide-react";

const STATUS_COLORS = {
  pending: "bg-amber-100 text-amber-800",
  accepted: "bg-emerald-100 text-emerald-800",
  completed: "bg-stone-100 text-stone-600",
  cancelled: "bg-red-100 text-red-700",
  rejected: "bg-red-100 text-red-700",
};

const MaidBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const fetchBookings = async () => {
    try {
      const res = await API.get("/maid/bookings");
      setBookings(res.data);
    } catch {
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/maid/bookings/${id}`, { status });
      showToast(`Booking ${status}!`);
      fetchBookings();
    } catch {
      showToast("Failed to update status.");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-stone-50">
      <MaidNavbar />
      {toast && (
        <div className="fixed top-20 right-6 bg-emerald-900 text-white px-6 py-3 rounded-xl shadow-lg z-50 text-sm font-medium">
          {toast}
        </div>
      )}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-stone-900 mb-1">My Bookings</h1>
        <p className="text-stone-500 mb-8">Manage all your service requests</p>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-16 text-center">
            <Calendar size={48} className="text-stone-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-stone-700 mb-2">
              No bookings yet
            </h3>
            <p className="text-stone-400">
              When customers book your services, they'll appear here
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-stone-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center text-stone-700 font-semibold text-sm">
                          {b.customer_name?.[0]}
                        </div>
                        <div>
                          <p className="font-medium text-stone-800">
                            {b.customer_name}
                          </p>
                          <p className="text-xs text-stone-400">
                            {b.customer_phone}
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
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${STATUS_COLORS[b.status] || STATUS_COLORS.pending}`}
                      >
                        {b.status === "accepted" ? "Upcoming" : b.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {b.status === "pending" && (
                          <>
                            <button
                              onClick={() => updateStatus(b.id, "upcoming")}
                              className="text-xs bg-emerald-900 text-white px-3 py-1.5 rounded-lg hover:bg-emerald-800 transition"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => updateStatus(b.id, "cancelled")}
                              className="text-xs bg-red-50 text-red-600 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-100 transition"
                            >
                              Decline
                            </button>
                          </>
                        )}
                        {b.status === "accepted" && (
                          <button
                            onClick={() => updateStatus(b.id, "completed")}
                            className="text-xs bg-stone-100 text-stone-700 px-3 py-1.5 rounded-lg hover:bg-stone-200 transition"
                          >
                            Mark Complete
                          </button>
                        )}
                        {(b.status === "completed" ||
                          b.status === "cancelled") && (
                          <span className="text-xs text-stone-400 italic">
                            No actions
                          </span>
                        )}
                      </div>
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

export default MaidBookings;
