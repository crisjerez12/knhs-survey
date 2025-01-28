import { Link, useLocation } from "react-router-dom";
import { BaggageClaim } from "lucide-react";
import logo from "../assets/logo-withname.png";
export default function Header() {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} className="h-10" />
        </Link>

        {/* Desktop Navigation */}
        <div className="flex items-center space-x-8">
          <Link
            to="/packages"
            className={`nav-link ${
              location.pathname === "/offers" ? "text-secondary" : ""
            }`}
          >
            <div className="flex space-x-1">
              <BaggageClaim />
              <span>Offers</span>
            </div>
          </Link>
        </div>
      </nav>
    </header>
  );
}
