import { useEffect, useState } from "react";
import API from "../../utils/axios";
import AdminNavbar from "../../components/layout/AdminNavbar";
import Loader from "../../components/common/Loader";
import { Star } from "lucide-react";

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get("/admin/reviews");
        setReviews(res.data);
      } catch {
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={
          i < rating
            ? "text-amber-400 fill-amber-400"
            : "text-stone-200 fill-stone-200"
        }
      />
    ));

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-stone-50">
      <AdminNavbar />
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-stone-900 mb-1">Reviews</h1>
        <p className="text-stone-500 mb-8">
          All customer reviews — {reviews.length} total
        </p>

        {reviews.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-16 text-center">
            <Star size={48} className="text-stone-300 mx-auto mb-4" />
            <p className="text-stone-500">No reviews yet</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {reviews.map((r) => (
              <div
                key={r.id}
                className="bg-white rounded-xl border border-stone-200 p-6"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm">
                      {r.customer_name?.[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-stone-800">
                        {r.customer_name}
                      </p>
                      <p className="text-sm text-stone-400 mb-1">
                        reviewed{" "}
                        <span className="text-stone-600 font-medium">
                          {r.maid_name}
                        </span>
                      </p>
                      <div className="flex gap-0.5 mb-2">
                        {renderStars(r.rating)}
                      </div>
                      <p className="text-stone-600 text-sm">{r.comment}</p>
                    </div>
                  </div>
                  <p className="text-xs text-stone-400">
                    {new Date(r.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReviews;
