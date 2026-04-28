import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6 px-4 text-center">
      {/* Visual Icon/Graphic */}
      <div className="relative">
        <h1 className="text-9xl font-extrabold text-gray-200 tracking-widest">
          404
        </h1>
        <div className="bg-rose-600 px-2 text-sm rounded rotate-12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
          Page Not Found
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-darkRose2">
          Oops! You&apos;ve wandered off track.
        </h2>
        <p className="text-gray-500 max-w-sm mx-auto">
          The page you are looking for doesn&apos;t exist or you don&apos;t have
          permission to view it.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Link
          href="/"
          className="px-6 py-3 bg-darkRose2 text-white rounded-lg font-medium hover:bg-rose-700 transition-all shadow-md hover:shadow-lg active:scale-95"
        >
          Return Home
        </Link>
        <Link
          href="/support"
          className="px-6 py-3 border border-gray-300 text-gray-600 rounded-lg font-medium hover:bg-gray-50 transition-all active:scale-95"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
}
