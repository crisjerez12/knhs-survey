import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-20 flex items-center bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 flex justify-center flex-col items-center">
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
            <span>Poblacion, Maasim, Sarangani Province, Philippines</span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className=" "
        >
          <motion.a
            href="/packages"
            className="btn btn-primary shadow-xl px-20 py-4 text-xl hover:shadow-lg"
          >
            Reserve Now
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
