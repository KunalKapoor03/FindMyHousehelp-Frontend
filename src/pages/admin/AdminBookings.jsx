import { useEffect, useState } from "react";
import API from "../../utils/axios";
import AdminNavbar from "../../components/layout/AdminNavbar";
import Loader from "../../components/common/Loader";
import { Calendar } from "lucide-react";

const STATUS_COLORS = {
  pending: "bg-amber-100 text-amber-800",
  accepted: "bg-emerald-100 text-emerald-800",
  completed: "bg-stone-100 text-stone-600",
  cancelled: "bg-red-100 text-red-700",
  rejected: "bg-red-100 text-red-700",
};

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get("/admin/bookings");
        setBookings(res.data);
      } catch {
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const filtered =
    filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-stone-50">
      <AdminNavbar />
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-stone-900 mb-1">All Bookings</h1>
        <p className="text-stone-500 mb-8">
          Complete list of all service bookings — {bookings.length} total
        </p>

        <div className="flex gap-2 mb-6">
          {["all", "pending", "accepted", "completed", "cancelled"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition ${filter === s ? "bg-emerald-900 text-white" : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"}`}
            >
              {s}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-16 text-center">
            <Calendar size={48} className="text-stone-300 mx-auto mb-4" />
            <p className="text-stone-500">No bookings found</p>
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
                    Maid
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
                {filtered.map((b) => (
                  <tr key={b.id} className="hover:bg-stone-50 transition">
                    <td className="px-6 py-4 font-medium text-stone-800">
                      {b.customer_name}
                    </td>
                    <td className="px-6 py-4 text-stone-600">{b.maid_name}</td>
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
                        {b.status}
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

export default AdminBookings;
