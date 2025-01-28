import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { MapPin, Clock, Phone } from 'lucide-react';

const customIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const restaurantLocation = {
  lat: 14.5995,
  lng: 120.9842,
  name: "Tasty Bites Restaurant",
  address: "123 Foodie Street, Culinary District",
  hours: "11:00 AM - 10:00 PM",
  phone: "+1 (555) 123-4567"
};

export default function Location() {
  return (
    <section className="py-16 bg-white" id="location">
      <div className="container mx-auto px-4">
        <h2 className="font-fredoka text-3xl text-center mb-12">
          Find Us Here
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-poppins font-medium text-lg mb-2">
                  Location
                </h3>
                <p className="text-gray-600">
                  {restaurantLocation.address}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-poppins font-medium text-lg mb-2">
                  Opening Hours
                </h3>
                <p className="text-gray-600">
                  Daily: {restaurantLocation.hours}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-poppins font-medium text-lg mb-2">
                  Contact
                </h3>
                <p className="text-gray-600">
                  {restaurantLocation.phone}
                </p>
              </div>
            </div>
          </div>

          <div className="h-[400px]">
            <MapContainer
              center={[restaurantLocation.lat, restaurantLocation.lng]}
              zoom={15}
              scrollWheelZoom={false}
              className="h-full w-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                position={[restaurantLocation.lat, restaurantLocation.lng]}
                icon={customIcon}
              >
                <Popup>
                  <div className="font-quicksand">
                    <h3 className="font-medium text-lg mb-2">
                      {restaurantLocation.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {restaurantLocation.address}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      Open Daily: {restaurantLocation.hours}
                    </p>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </section>
  );
}