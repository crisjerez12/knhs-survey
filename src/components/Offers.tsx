"use client";

import OfferCarousel from "./OfferCarousel";
import OffersLoading from "./OffersLoading";
import { useOffers } from "../context/OffersContext";

export default function Offers() {
  const { occasions, loading, error } = useOffers();

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-3xl font-bold text-center mb-12">
          Our Packages
        </h2>

        {loading ? (
          <OffersLoading />
        ) : error ? (
          <p className="text-center text-red-500">
            Error loading packages: {error.message}
          </p>
        ) : occasions && occasions.length > 0 ? (
          <div className="relative max-w-4xl mx-auto">
            <OfferCarousel occasions={occasions} />
          </div>
        ) : (
          <p className="text-center">No packages available at the moment.</p>
        )}
      </div>
    </section>
  );
}
