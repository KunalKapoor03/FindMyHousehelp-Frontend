import { useEffect, useState } from "react";
import API from "../../utils/axios";
import Loader from "../../components/common/Loader";
import CustomerNavbar from "../../components/layout/CustomerNavbar";
import { Search, X } from "lucide-react";

const SERVICES = [
  "All",
  "House Cleaning",
  "Cooking",
  "Babysitting",
  "Elderly Care",
  "Pet Care",
  "Laundry",
];

const FindHelp = () => {
  const [maids, setMaids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [booking, setBooking] = useState(null);
  const [bookingData, setBookingData] = useState({ service: "", date: "" });
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get("/customer/maids");
        setMaids(res.data);
      } catch {
        setMaids([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const filtered = maids.filter((m) => {
    const services = (() => {
      try {
        return JSON.parse(m.services || "[]");
      } catch {
        return [];
      }
    })();
    const matchSearch =
      m.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      m.preferred_work_location?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || services.includes(filter);
    return matchSearch && matchFilter;
  });

  const handleBook = async () => {
    if (!bookingData.service || !bookingData.date)
      return showToast("Please select a service and date.");
    try {
      await API.post("/customer/bookings", {
        maid_id: booking.id,
        service: bookingData.service,
        date: bookingData.date,
      });
      setBooking(null);
      setBookingData({ service: "", date: "" });
      showToast("Booking request sent successfully!");
    } catch (err) {
      showToast(err?.response?.data?.message || "Booking failed.");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-stone-50">
      <CustomerNavbar />
      {toast && (
        <div className="fixed top-20 right-6 bg-emerald-900 text-white px-6 py-3 rounded-xl shadow-lg z-50 text-sm font-medium">
          {toast}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-stone-900 mb-1">Find Help</h1>
        <p className="text-stone-500 mb-8">Browse verified service providers</p>

        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or location..."
              className="w-full border border-stone-200 bg-white rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="flex gap-2 mb-8 flex-wrap">
          {SERVICES.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${filter === s ? "bg-emerald-900 text-white" : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"}`}
            >
              {s}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-16 text-center">
            <Search size={48} className="text-stone-300 mx-auto mb-4" />
            <p className="text-stone-500">No service providers found</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {filtered.map((m) => {
              const services = (() => {
                try {
                  return JSON.parse(m.services || "[]");
                } catch {
                  return [];
                }
              })();
              return (
                <div
                  key={m.id}
                  className="bg-white rounded-2xl border border-stone-200 p-6 hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold text-lg">
                      {m.full_name?.[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-stone-800">
                        {m.full_name}
                      </p>
                      <p className="text-xs text-stone-400">
                        {m.preferred_work_location || "—"}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {services.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        className="bg-emerald-50 text-emerald-700 text-xs px-2 py-0.5 rounded-full"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between text-sm text-stone-500 mb-5">
                    <span>⭐ {m.rating?.toFixed(1) || "New"}</span>
                    <span>{m.years_of_experience} yrs exp</span>
                    <span className="font-semibold text-stone-700">
                      ₹{m.hourly_rate}/hr
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setBooking(m);
                      setBookingData({ service: services[0] || "", date: "" });
                    }}
                    className="w-full bg-emerald-900 text-white py-2.5 rounded-xl font-medium hover:bg-emerald-800 transition"
                  >
                    Book Now
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {booking && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-stone-900">
                Book {booking.full_name}
              </h2>
              <button
                onClick={() => setBooking(null)}
                className="text-stone-400 hover:text-stone-600"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  Select Service
                </label>
                <select
                  value={bookingData.service}
                  onChange={(e) =>
                    setBookingData({ ...bookingData, service: e.target.value })
                  }
                  className="w-full border border-stone-200 bg-stone-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {(() => {
                    try {
                      return JSON.parse(booking.services || "[]");
                    } catch {
                      return [];
                    }
                  })().map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  Select Date
                </label>
                <input
                  type="date"
                  value={bookingData.date}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) =>
                    setBookingData({ ...bookingData, date: e.target.value })
                  }
                  className="w-full border border-stone-200 bg-stone-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="bg-stone-50 rounded-xl p-4 text-sm text-stone-600">
                <p>
                  Rate:{" "}
                  <span className="font-semibold text-stone-800">
                    ₹{booking.hourly_rate}/hr
                  </span>
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setBooking(null)}
                className="flex-1 border border-stone-200 text-stone-600 py-3 rounded-xl font-medium hover:bg-stone-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleBook}
                className="flex-1 bg-emerald-900 text-white py-3 rounded-xl font-medium hover:bg-emerald-800 transition"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindHelp;
