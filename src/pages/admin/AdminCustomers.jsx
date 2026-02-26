import { useEffect, useState } from "react";
import API from "../../utils/axios";
import AdminNavbar from "../../components/layout/AdminNavbar";
import Loader from "../../components/common/Loader";
import { Users } from "lucide-react";

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const fetchCustomers = async () => {
    try {
      const res = await API.get("/admin/customers");
      setCustomers(res.data);
    } catch {
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const toggleSuspend = async (userId, isActive) => {
    try {
      await API.patch(`/admin/suspend/${userId}`);
      showToast(isActive ? "User suspended" : "User activated");
      fetchCustomers();
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
        <h1 className="text-3xl font-bold text-stone-900 mb-1">Customers</h1>
        <p className="text-stone-500 mb-8">
          All registered customers — {customers.length} total
        </p>

        {customers.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-16 text-center">
            <Users size={48} className="text-stone-300 mx-auto mb-4" />
            <p className="text-stone-500">No customers found</p>
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
                    Email
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {customers.map((c) => (
                  <tr key={c._id} className="hover:bg-stone-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm">
                          {c.full_name?.[0]}
                        </div>
                        <span className="font-medium text-stone-800">
                          {c.full_name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-stone-500 text-sm">
                      {c.email}
                    </td>
                    <td className="px-6 py-4 text-stone-500 text-sm">
                      {c.phone || "—"}
                    </td>
                    <td className="px-6 py-4 text-stone-500 text-sm">
                      {new Date(c.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${c.isActive ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-700"}`}
                      >
                        {c.isActive ? "Active" : "Suspended"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleSuspend(c._id, c.isActive)}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition ${c.isActive ? "border-red-200 text-red-600 hover:bg-red-50" : "border-emerald-200 text-emerald-700 hover:bg-emerald-50"}`}
                      >
                        {c.isActive ? "Suspend" : "Activate"}
                      </button>
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

export default AdminCustomers;
