import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import OffersPage from "./pages/OffersPage";
import Footer from "./components/Footer";
import { OffersProvider } from "./context/OffersContext";

export default function App() {
  return (
    <OffersProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/packages" element={<OffersPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </OffersProvider>
  );
}
