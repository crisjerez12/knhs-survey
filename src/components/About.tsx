import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  return (
    <section className="py-16 bg-white" id="about">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12"
        >
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="font-fredoka text-3xl mb-8">About Us</h2>

            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-poppins font-medium text-lg mb-2">
                  Location
                </h3>
                <p className="text-gray-600">
                  Poblacion, Maasim, Sarangani Province, Philippines
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Phone className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-poppins font-medium text-lg mb-2">
                  Contact
                </h3>
                <p className="text-gray-600">+63 909 1730 091</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Mail className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-poppins font-medium text-lg mb-2">Email</h3>
                <p className="text-gray-600">judelynbolivar5@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Clock className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-poppins font-medium text-lg mb-2">Hours</h3>
                <p className="text-gray-600">
                  Sunday - Friday: 5:00 AM - 7:00 PM
                </p>
                <p className="text-gray-600">No Transaction on Saturday</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="h-[400px]">
            <MapContainer
              center={[5.861218, 124.996742]}
              zoom={20}
              scrollWheelZoom={false}
              className="h-full w-full rounded-lg shadow-lg"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[5.861218, 124.996742]}>
                <Popup>
                  <div className="font-quicksand">
                    <h3 className="font-medium text-lg mb-2">Lechem Cuizine</h3>
                    <p className="text-sm text-gray-600">
                      Poblacion, Maasim, Sarangani Province
                    </p>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
