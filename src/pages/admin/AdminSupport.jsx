import { useEffect, useState } from "react";
import API from "../../utils/axios";
import AdminNavbar from "../../components/layout/AdminNavbar";
import Loader from "../../components/common/Loader";
import { Headphones } from "lucide-react";

const STATUS_COLORS = {
  open: "bg-red-100 text-red-700",
  in_progress: "bg-amber-100 text-amber-800",
  resolved: "bg-emerald-100 text-emerald-800",
  closed: "bg-stone-100 text-stone-600",
};

const AdminSupport = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const fetchTickets = async () => {
    try {
      const res = await API.get("/admin/support");
      setTickets(res.data);
    } catch {
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.patch(`/admin/support/${id}`, { status });
      showToast("Ticket updated!");
      fetchTickets();
    } catch {
      showToast("Update failed");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-stone-50">
      <AdminNavbar />
      {toast && (
        <div className="fixed top-20 right-6 bg-emerald-900 text-white px-6 py-3 rounded-xl shadow-lg z-50 text-sm font-medium">
          {toast}
        </div>
      )}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-stone-900 mb-1">
          Support Tickets
        </h1>
        <p className="text-stone-500 mb-8">
          Manage customer and maid support queries — {tickets.length} total
        </p>

        {tickets.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-16 text-center">
            <Headphones size={48} className="text-stone-300 mx-auto mb-4" />
            <p className="text-stone-500">No support tickets yet</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {tickets.map((t) => (
              <div
                key={t._id}
                className="bg-white rounded-xl border border-stone-200 p-6"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
                      {t.user?.full_name?.[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <p className="font-semibold text-stone-800">
                          {t.user?.full_name}
                        </p>
                        <span className="text-xs text-stone-400">
                          {t.user?.email}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${STATUS_COLORS[t.status]}`}
                        >
                          {t.status.replace("_", " ")}
                        </span>
                      </div>
                      <p className="text-stone-700 font-medium mb-1">
                        {t.subject}
                      </p>
                      <p className="text-stone-500 text-sm">{t.message}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <p className="text-xs text-stone-400">
                      {new Date(t.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <select
                      value={t.status}
                      onChange={(e) => updateStatus(t._id, e.target.value)}
                      className="text-xs border border-stone-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    >
                      <option value="open">Open</option>
                      <option value="in_progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSupport;
