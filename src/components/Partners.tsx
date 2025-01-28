export default function Partners() {
  const partners = [
    "Raw Materials Suppliers",
    "Event Planners",
    "Government Agencies",
    "Equipment Supplier",
  ];

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="mb-8 text-center">
        <h2 className="font-display text-3xl font-bold">Trusted Partners</h2>
      </div>
      <div className="relative">
        <div className="flex overflow-hidden">
          <div className="marquee py-4">
            {partners.map((partner, index) => (
              <span
                key={index}
                className="mx-8 text-gray-600 whitespace-nowrap"
              >
                {partner}
              </span>
            ))}
          </div>
          <div className="marquee py-4">
            {partners.map((partner, index) => (
              <span
                key={`duplicate-${index}`}
                className="mx-8 text-gray-600 whitespace-nowrap"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
