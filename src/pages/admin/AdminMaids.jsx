import { useEffect, useState } from "react";
import API from "../../utils/axios";
import AdminNavbar from "../../components/layout/AdminNavbar";
import Loader from "../../components/common/Loader";
import { ShieldCheck } from "lucide-react";

const AdminMaids = () => {
  const [maids, setMaids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const fetchMaids = async () => {
    try {
      const res = await API.get("/admin/maids");
      setMaids(res.data);
    } catch {
      setMaids([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaids();
  }, []);

  const approveMaid = async (maidId) => {
    try {
      await API.patch(`/admin/approve/${maidId}`);
      showToast("Maid approved!");
      fetchMaids();
    } catch {
      showToast("Action failed");
    }
  };

  const toggleSuspend = async (userId, isActive) => {
    try {
      await API.patch(`/admin/suspend/${userId}`);
      showToast(isActive ? "User suspended" : "User activated");
      fetchMaids();
    } catch {
      showToast("Action failed");
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
          Service Providers
        </h1>
        <p className="text-stone-500 mb-8">
          Manage maids and approve new registrations — {maids.length} total
        </p>

        {maids.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-16 text-center">
            <ShieldCheck size={48} className="text-stone-300 mx-auto mb-4" />
            <p className="text-stone-500">No maids found</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    Provider
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    Services
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    Rate
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    Rating
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
                {maids.map((m) => (
                  <tr key={m.id} className="hover:bg-stone-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-semibold text-sm">
                          {m.full_name?.[0]}
                        </div>
                        <div>
                          <p className="font-medium text-stone-800">
                            {m.full_name}
                          </p>
                          <p className="text-xs text-stone-400">{m.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {m.services?.slice(0, 2).map((s) => (
                          <span
                            key={s}
                            className="bg-emerald-50 text-emerald-700 text-xs px-2 py-0.5 rounded-full"
                          >
                            {s}
                          </span>
                        ))}
                        {m.services?.length > 2 && (
                          <span className="text-xs text-stone-400">
                            +{m.services.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-stone-500 text-sm">
                      {m.preferred_location || "—"}
                    </td>
                    <td className="px-6 py-4 text-stone-700 text-sm font-medium">
                      ₹{m.hourly_rate}/hr
                    </td>
                    <td className="px-6 py-4 text-stone-700 text-sm">
                      ⭐ {m.rating?.toFixed(1)} ({m.total_reviews})
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-semibold w-fit ${m.is_approved ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}
                        >
                          {m.is_approved ? "Approved" : "Pending"}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-semibold w-fit ${m.isActive ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"}`}
                        >
                          {m.isActive ? "Active" : "Suspended"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {!m.is_approved && (
                          <button
                            onClick={() => approveMaid(m.id)}
                            className="text-xs bg-emerald-900 text-white px-3 py-1.5 rounded-lg hover:bg-emerald-800 transition"
                          >
                            Approve
                          </button>
                        )}
                        <button
                          onClick={() => toggleSuspend(m.userId, m.isActive)}
                          className={`text-xs px-3 py-1.5 rounded-lg border transition ${m.isActive ? "border-red-200 text-red-600 hover:bg-red-50" : "border-emerald-200 text-emerald-700 hover:bg-emerald-50"}`}
                        >
                          {m.isActive ? "Suspend" : "Activate"}
                        </button>
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

export default AdminMaids;
