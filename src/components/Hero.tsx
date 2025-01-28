import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-20 flex items-center bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
            Elevate Your Events with Exquisite Catering
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Creating unforgettable culinary experiences for your special moments
          </p>
          <div className="flex items-center justify-center space-x-2 text-gray-500 mb-8">
            <MapPin className="w-5 h-5" />
            <span>Maasim, Sarangani Province, Philippines</span>
          </div>
        </motion.div>
      </div>

      {/* Fixed CTA Button with jumping animation */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-8 right-8 z-[60]"
      >
        <motion.a
          href="/offers"
          className="btn btn-primary shadow-xl hover:shadow-lg"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          Reserve Now
        </motion.a>
      </motion.div>
    </section>
  );
}
