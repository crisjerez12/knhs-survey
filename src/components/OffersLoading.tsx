export default function OffersLoading() {
  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="animate-pulse">
        <div className="grid md:grid-cols-2">
          <div className="bg-gray-300 h-64 md:h-auto"></div>
          <div className="p-6">
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-6 bg-gray-300 rounded w-20"></div>
                ))}
              </div>
              <div className="h-8 bg-gray-300 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

