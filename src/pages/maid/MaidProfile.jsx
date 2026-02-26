import { useState, useEffect } from "react";
import API from "../../utils/axios";
import MaidNavbar from "../../components/layout/MaidNavbar";
import { User, Lock } from "lucide-react";

const SERVICES = [
  "House Cleaning",
  "Cooking",
  "Babysitting",
  "Elderly Care",
  "Pet Care",
  "Laundry",
];
const LANGUAGES = [
  "English",
  "Spanish",
  "French",
  "Mandarin",
  "Hindi",
  "Arabic",
];

const MaidProfile = () => {
  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    preferred_work_location: "",
    years_of_experience: 0,
    hourly_rate: 0,
    services: [],
    languages: [],
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
        const res = await API.get("/maid/profile");
        const d = res.data;
        setProfile({
          ...d,
          services: (() => {
            try {
              return JSON.parse(d.services || "[]");
            } catch {
              return [];
            }
          })(),
          languages: (() => {
            try {
              return JSON.parse(d.languages || "[]");
            } catch {
              return [];
            }
          })(),
        });
      } catch {
        const stored = JSON.parse(localStorage.getItem("user") || "{}");
        setProfile((prev) => ({
          ...prev,
          full_name: stored.full_name || "",
          email: stored.email || "",
          phone: stored.phone || "",
        }));
      }
    };
    fetchProfile();
  }, []);

  const toggleItem = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.put("/maid/profile", {
        ...profile,
        services: JSON.stringify(profile.services),
        languages: JSON.stringify(profile.languages),
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
      await API.put("/maid/change-password", passwords);
      setPasswords({ current_password: "", new_password: "" });
      showToast("Password changed successfully!");
    } catch {
      showToast("Failed to change password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <MaidNavbar />
      {toast && (
        <div className="fixed top-20 right-6 bg-emerald-900 text-white px-6 py-3 rounded-xl shadow-lg z-50 text-sm font-medium">
          {toast}
        </div>
      )}
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-stone-900 mb-1">
          Profile Settings
        </h1>
        <p className="text-stone-500 mb-8">
          Manage your account and service information
        </p>

        <div className="bg-white rounded-2xl border border-stone-200 p-8 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <User size={20} className="text-stone-600" />
            <h2 className="text-lg font-bold text-stone-900">
              Profile Information
            </h2>
          </div>
          <form onSubmit={handleProfileUpdate} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
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
                  Phone
                </label>
                <input
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
                  className="w-full border border-stone-200 bg-stone-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
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
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  Years of Experience
                </label>
                <input
                  type="number"
                  min="0"
                  value={profile.years_of_experience}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      years_of_experience: e.target.value,
                    })
                  }
                  className="w-full border border-stone-200 bg-stone-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  Hourly Rate (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  value={profile.hourly_rate}
                  onChange={(e) =>
                    setProfile({ ...profile, hourly_rate: e.target.value })
                  }
                  className="w-full border border-stone-200 bg-stone-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Preferred Work Location
              </label>
              <input
                value={profile.preferred_work_location}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    preferred_work_location: e.target.value,
                  })
                }
                className="w-full border border-stone-200 bg-stone-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-3">
                Services Offered
              </label>
              <div className="grid grid-cols-3 gap-2">
                {SERVICES.map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => toggleItem("services", s)}
                    className={`py-2.5 rounded-xl border text-sm font-medium transition ${profile.services.includes(s) ? "bg-emerald-900 text-white border-emerald-900" : "bg-white text-stone-600 border-stone-200 hover:border-emerald-400"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-3">
                Languages Known
              </label>
              <div className="grid grid-cols-3 gap-2">
                {LANGUAGES.map((l) => (
                  <button
                    type="button"
                    key={l}
                    onClick={() => toggleItem("languages", l)}
                    className={`py-2.5 rounded-xl border text-sm font-medium transition ${profile.languages.includes(l) ? "bg-emerald-900 text-white border-emerald-900" : "bg-white text-stone-600 border-stone-200 hover:border-emerald-400"}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
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

export default MaidProfile;
