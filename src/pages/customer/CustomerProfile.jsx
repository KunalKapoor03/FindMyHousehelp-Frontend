import { useState, useEffect } from "react";
import API from "../../utils/axios";
import CustomerNavbar from "../../components/layout/CustomerNavbar";
import { User, Lock } from "lucide-react";

const CustomerProfile = () => {
  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
    phone: "",
  });
  const [passwords, setPasswords] = useState({
    current_password: "",
    new_password: "",
  });
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3500);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/customer/profile");
        setProfile({
          full_name: res.data.full_name,
          email: res.data.email,
          phone: res.data.phone,
        });
      } catch {
        const stored = JSON.parse(localStorage.getItem("user") || "{}");
        setProfile({
          full_name: stored.full_name || "",
          email: stored.email || "",
          phone: stored.phone || "",
        });
      }
    };
    fetchProfile();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.put("/customer/profile", {
        full_name: profile.full_name,
        phone: profile.phone,
      });
      showToast("Profile updated successfully!");
    } catch {
      showToast("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.put("/customer/change-password", passwords);
      setPasswords({ current_password: "", new_password: "" });
      showToast("Password changed successfully!");
    } catch {
      showToast("Failed to change password. Check your current password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <CustomerNavbar />
      {toast && (
        <div className="fixed top-20 right-6 bg-emerald-900 text-white px-6 py-3 rounded-xl shadow-lg z-50 text-sm font-medium">
          {toast}
        </div>
      )}
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-stone-900 mb-1">
          Profile Settings
        </h1>
        <p className="text-stone-500 mb-8">Manage your account information</p>

        <div className="bg-white rounded-2xl border border-stone-200 p-8 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <User size={20} className="text-stone-600" />
            <h2 className="text-lg font-bold text-stone-900">
              Profile Information
            </h2>
          </div>
          <form onSubmit={handleProfileUpdate} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Full Name
              </label>
              <input
                value={profile.full_name}
                onChange={(e) =>
                  setProfile({ ...profile, full_name: e.target.value })
                }
                className="w-full border border-stone-200 bg-stone-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Email
              </label>
              <input
                value={profile.email}
                disabled
                className="w-full border border-stone-200 bg-stone-100 rounded-xl px-4 py-3 text-stone-400 cursor-not-allowed"
              />
              <p className="text-xs text-stone-400 mt-1">
                Email cannot be changed
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Phone Number
              </label>
              <input
                value={profile.phone}
                onChange={(e) =>
                  setProfile({ ...profile, phone: e.target.value })
                }
                className="w-full border border-stone-200 bg-stone-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-emerald-900 text-white px-6 py-2.5 rounded-full font-medium hover:bg-emerald-800 transition disabled:opacity-60"
            >
              Update Profile
            </button>
          </form>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-8">
          <div className="flex items-center gap-2 mb-6">
            <Lock size={20} className="text-stone-600" />
            <h2 className="text-lg font-bold text-stone-900">
              Change Password
            </h2>
          </div>
          <form onSubmit={handlePasswordChange} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                value={passwords.current_password}
                onChange={(e) =>
                  setPasswords({
                    ...passwords,
                    current_password: e.target.value,
                  })
                }
                placeholder="••••••••"
                className="w-full border border-stone-200 bg-stone-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                value={passwords.new_password}
                onChange={(e) =>
                  setPasswords({ ...passwords, new_password: e.target.value })
                }
                placeholder="••••••••"
                className="w-full border border-stone-200 bg-stone-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-emerald-900 text-white px-6 py-2.5 rounded-full font-medium hover:bg-emerald-800 transition disabled:opacity-60"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
