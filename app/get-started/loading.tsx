export default function GetStartedLoading() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-4 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded w-1/4 mt-6 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
