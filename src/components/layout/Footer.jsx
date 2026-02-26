import { Home } from "lucide-react";

const Footer = () => (
  <footer className="bg-black text-white text-center py-8">
    <div className="flex items-center justify-center gap-2 mb-2">
      <Home size={20} className="text-emerald-400" />
      <span className="font-semibold text-lg">FindMyHouseHelp</span>
    </div>
    <p className="text-sm text-stone-400">
      © 2026 FindMyHouseHelp. All rights reserved.
    </p>
  </footer>
);

export default Footer;
