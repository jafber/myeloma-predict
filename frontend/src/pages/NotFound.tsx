function NotFound() {
  return (
    <div className="flex items-center justify-center pt-5">
        <div className="text-center">
            <div className="mb-8 animate-bounce">
                <svg className="w-32 h-32 mx-auto text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <h1 className="text-6xl font-bold text-gray-700 dark:text-gray-300 mb-4 animate-pulse">404</h1>
            <p className="text-2xl text-gray-700 dark:text-gray-300 mb-8">Page Not Found</p>
            <p className=" text-gray-700 dark:text-gray-300 mb-8 max-w-md">The page you're looking for doesn't exist or has been moved.</p>
            <a href="/" className="inline-block px-8 py-3 bg-primary/80 hover:bg-primary text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105">
                Go Home
            </a>
        </div>
    </div>
  )
}

export default NotFound