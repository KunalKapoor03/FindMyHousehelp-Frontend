import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Home } from "lucide-react";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    phone: "",
    role: "customer",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(formData);
      navigate("/customer/dashboard");
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
        Create Your Account
      </h1>
      <p className="text-stone-500 mb-8">Find trusted help for your home</p>

      <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8 w-full max-w-md">
        {error && (
          <div className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-3 mb-4">
            {error}
          </div>
        )}
        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Full Name
            </label>
            <input
              name="full_name"
              placeholder="John Doe"
              value={formData.full_name}
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
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-stone-200 bg-stone-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Phone Number
            </label>
            <input
              name="phone"
              placeholder="+1234567890"
              value={formData.phone}
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
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-stone-200 bg-stone-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-900 text-white py-3 rounded-xl font-semibold hover:bg-emerald-800 transition disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
        <p className="mt-6 text-center text-stone-500 text-sm">
          Already have an account?{" "}
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

export default Register;
