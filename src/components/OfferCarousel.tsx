"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Occasion {
  id: number;
  title: string;
  image: string;
  attributes: string[];
  price: string;
}

interface OfferCarouselProps {
  occasions: Occasion[];
}

export default function OfferCarousel({ occasions }: OfferCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % occasions.length);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + occasions.length) % occasions.length);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        className="card overflow-hidden"
      >
        <div className="grid md:grid-cols-2">
          <div className="relative h-64 md:h-auto">
            <img
              src={occasions[currentIndex].image || "/placeholder.svg"}
              alt={occasions[currentIndex].title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="p-6">
            <h3 className="font-display text-2xl font-bold mb-4">
              {occasions[currentIndex].title}
            </h3>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {occasions[currentIndex].attributes.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className="text-2xl font-bold text-gray-900">
                &#8369; {occasions[currentIndex].price.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
