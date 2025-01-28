import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    rating: 5,
    text: "The food was absolutely amazing! Every dish was perfectly prepared and the service was impeccable.",
  },
  {
    id: 2,
    name: "Michael Chen",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    rating: 5,
    text: "Best dining experience in the city! The atmosphere is perfect for both casual dining and special occasions.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    photo:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
    rating: 5,
    text: "The attention to detail in every dish is remarkable. A true culinary gem!",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const autoScrollTimer = useRef<NodeJS.Timeout | null>(null);

  const startAutoScroll = () => {
    if (autoScrollTimer.current) clearInterval(autoScrollTimer.current);
    autoScrollTimer.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
  };

  useEffect(() => {
    if (isAutoScrolling) startAutoScroll();
    return () => {
      if (autoScrollTimer.current) clearInterval(autoScrollTimer.current);
    };
  }, [isAutoScrolling]);

  const handleManualNavigation = (direction: "prev" | "next") => {
    setIsAutoScrolling(false);
    if (direction === "prev") {
      setCurrentIndex(
        (prev) => (prev - 1 + testimonials.length) % testimonials.length
      );
    } else {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }
    setTimeout(() => setIsAutoScrolling(true), 5000);
  };

  return (
    <section className="py-16 bg-gray-50" id="testimonials">
      <div className="container mx-auto px-4">
        <h2 className="font-fredoka text-3xl text-center mb-12">
          What Our Guests Say
        </h2>

        <div className="relative max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="card p-6"
            >
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={testimonials[currentIndex].photo}
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <h3 className="font-poppins font-medium text-lg">
                    {testimonials[currentIndex].name}
                  </h3>
                  <div className="flex">
                    {[...Array(testimonials[currentIndex].rating)].map(
                      (_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-secondary fill-current"
                        />
                      )
                    )}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-lg">
                "{testimonials[currentIndex].text}"
              </p>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={() => handleManualNavigation("prev")}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => handleManualNavigation("next")}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
