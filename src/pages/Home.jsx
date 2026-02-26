import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { ShieldCheck, Star, Clock } from "lucide-react";

const SERVICES = [
  {
    title: "House Cleaning",
    img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400",
  },
  {
    title: "Cooking",
    img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
  },
  {
    title: "Babysitting",
    img: "https://images.unsplash.com/photo-1587059918849-f03428a9e27d?w=400",
  },
  {
    title: "Elderly Care",
    img: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400",
  },
  {
    title: "Pet Care",
    img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400",
  },
  {
    title: "Laundry",
    img: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=400",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-emerald-900 text-white py-24 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4 leading-tight">
          Find Trusted Help
          <br />
          For Your Home
        </h1>
        <p className="text-emerald-200 text-lg max-w-xl mx-auto mb-10">
          Connect with verified, reliable domestic workers for cleaning,
          cooking, babysitting, and more.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/register"
            className="bg-white text-emerald-900 px-8 py-3 rounded-full font-semibold hover:bg-stone-100 transition"
          >
            Find Help Now
          </Link>
          <Link
            to="/maid/register"
            className="border border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-800 transition"
          >
            Register as Provider
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-stone-900 text-center mb-12">
          Why Choose FindMyHouseHelp?
        </h2>
        <div className="grid grid-cols-3 gap-8">
          {[
            {
              icon: <ShieldCheck size={32} className="text-emerald-700" />,
              title: "Verified Professionals",
              desc: "All service providers are background-checked and verified before joining our platform.",
            },
            {
              icon: <Star size={32} className="text-emerald-700" />,
              title: "Rated & Reviewed",
              desc: "Read genuine reviews from real customers to find the best match for your needs.",
            },
            {
              icon: <Clock size={32} className="text-emerald-700" />,
              title: "Quick Booking",
              desc: "Book a service in minutes. Get confirmed help at your doorstep when you need it.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl border border-stone-200 p-8 text-center"
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">
                {item.title}
              </h3>
              <p className="text-stone-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-stone-900 text-center mb-12">
            Our Services
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-sm"
              >
                <img
                  src={s.img}
                  alt={s.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-black/40 flex items-end p-6">
                  <h3 className="text-white text-xl font-semibold">
                    {s.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center bg-stone-50">
        <h2 className="text-3xl font-bold text-stone-900 mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-stone-500 mb-8 max-w-md mx-auto">
          Join thousands of happy families who trust FindMyHouseHelp for their
          home service needs.
        </p>
        <Link
          to="/register"
          className="bg-emerald-900 text-white px-10 py-3 rounded-full font-semibold hover:bg-emerald-800 transition"
        >
          Create Free Account
        </Link>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
