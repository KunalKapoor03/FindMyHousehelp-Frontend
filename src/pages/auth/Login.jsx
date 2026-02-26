import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Home } from "lucide-react";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      const user = JSON.parse(localStorage.getItem("user"));
      if (user.role === "admin") navigate("/admin/dashboard");
      else if (user.role === "maid") navigate("/maid/dashboard");
      else navigate("/customer/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center px-4">
      <div className="flex items-center gap-2 mb-8">
        <Home size={24} className="text-emerald-900" />
        <span className="text-xl font-bold text-emerald-900">
          FindMyHouseHelp
        </span>
      </div>
      <h1 className="text-3xl font-bold text-stone-900 mb-2">Welcome Back</h1>
      <p className="text-stone-500 mb-8">Sign in to your account to continue</p>

      <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8 w-full max-w-md">
        {error && (
          <div className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-3 mb-4">
            {error}
          </div>
        )}
        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-stone-200 bg-stone-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-stone-200 bg-stone-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-900 text-white py-3 rounded-xl font-semibold hover:bg-emerald-800 transition disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <div className="mt-6 text-center space-y-2">
          <p className="text-stone-500 text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-emerald-700 font-semibold hover:underline"
            >
              Sign up as Customer
            </Link>
          </p>
          <p className="text-stone-500 text-sm">
            Are you a service provider?{" "}
            <Link
              to="/maid/register"
              className="text-emerald-700 font-semibold hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
