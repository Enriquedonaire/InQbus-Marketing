export default function GetStartedPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Comenzar</div>
            <h1 className="block mt-1 text-lg leading-tight font-medium text-black">Página en mantenimiento</h1>
            <p className="mt-2 text-gray-500">
              Estamos trabajando en mejorar esta página. Por favor, vuelve más tarde.
            </p>
            <div className="mt-4">
              <a href="/" className="text-indigo-500 hover:text-indigo-700">
                Volver al inicio
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
