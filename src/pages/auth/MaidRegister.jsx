import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Home } from "lucide-react";
import API from "../../utils/axios";

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

const MaidRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    preferred_work_location: "",
    years_of_experience: 0,
    hourly_rate: 0,
    services: [],
    languages: [],
  });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [idProof, setIdProof] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const toggleItem = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        data.append(key, Array.isArray(val) ? JSON.stringify(val) : val);
      });
      if (profilePhoto) data.append("profile_photo", profilePhoto);
      if (idProof) data.append("id_proof", idProof);

      const res = await API.post("/auth/register/maid", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/maid/dashboard");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="flex items-center gap-2 mb-8">
        <Home size={24} className="text-emerald-900" />
        <span className="text-xl font-bold text-emerald-900">
          FindMyHouseHelp
        </span>
      </div>
      <h1 className="text-3xl font-bold text-stone-900 mb-2">
        Service Provider Registration
      </h1>
      <p className="text-stone-500 mb-8">
        Join our network of trusted professionals
      </p>

      <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8 w-full max-w-2xl">
        {error && (
          <div className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-3 mb-6">
            {error}
          </div>
        )}
        <form onSubmit={submit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Full Name
              </label>
              <input
                name="full_name"
                placeholder="Jane Smith"
                onChange={handleChange}
                className="w-full border border-stone-200 bg-stone-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="your@email.com"
                onChange={handleChange}
                className="w-full border border-stone-200 bg-stone-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Phone Number
              </label>
              <input
                name="phone"
                placeholder="+1234567890"
                onChange={handleChange}
                className="w-full border border-stone-200 bg-stone-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                onChange={handleChange}
                className="w-full border border-stone-200 bg-stone-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Address
            </label>
            <textarea
              name="address"
              onChange={handleChange}
              rows={2}
              className="w-full border border-stone-200 bg-stone-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Preferred Work Location
            </label>
            <input
              name="preferred_work_location"
              onChange={handleChange}
              className="w-full border border-stone-200 bg-stone-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-3">
              Services Offered
            </label>
            <div className="grid grid-cols-2 gap-3">
              {SERVICES.map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => toggleItem("services", s)}
                  className={`py-3 rounded-xl border text-sm font-medium transition ${formData.services.includes(s) ? "bg-emerald-900 text-white border-emerald-900" : "bg-white text-stone-600 border-stone-200 hover:border-emerald-400"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Years of Experience
              </label>
              <input
                name="years_of_experience"
                type="number"
                min="0"
                defaultValue={0}
                onChange={handleChange}
                className="w-full border border-stone-200 bg-stone-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Hourly Rate (₹)
              </label>
              <input
                name="hourly_rate"
                type="number"
                min="0"
                defaultValue={0}
                onChange={handleChange}
                className="w-full border border-stone-200 bg-stone-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-3">
              Languages Known
            </label>
            <div className="grid grid-cols-3 gap-3">
              {LANGUAGES.map((l) => (
                <button
                  type="button"
                  key={l}
                  onClick={() => toggleItem("languages", l)}
                  className={`py-3 rounded-xl border text-sm font-medium transition ${formData.languages.includes(l) ? "bg-emerald-900 text-white border-emerald-900" : "bg-white text-stone-600 border-stone-200 hover:border-emerald-400"}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Profile Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProfilePhoto(e.target.files[0])}
                className="w-full border border-stone-200 bg-stone-50 rounded-xl px-3 py-2.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                ID Proof
              </label>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => setIdProof(e.target.files[0])}
                className="w-full border border-stone-200 bg-stone-50 rounded-xl px-3 py-2.5 text-sm"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-900 text-white py-3 rounded-xl font-semibold hover:bg-emerald-800 transition disabled:opacity-60"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="mt-6 text-center text-stone-500 text-sm">
          Already registered?{" "}
          <Link
            to="/login"
            className="text-emerald-700 font-semibold hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default MaidRegister;
