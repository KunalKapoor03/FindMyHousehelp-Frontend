const Loader = () => {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-stone-200 border-t-emerald-900 rounded-full animate-spin" />
        <p className="text-stone-500 text-sm">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
