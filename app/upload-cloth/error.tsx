// app/upload-cloth/error.tsx
'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4 px-4 text-center">
      <h2 className="text-2xl font-bold text-rose-600">Restricted Access</h2>
      <p className="text-gray-600 max-w-md">
        {error.message }
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-darkRose2 text-white rounded-md hover:bg-rose-700 transition"
        >
          Try Again
        </button>
        <Link 
          href="/" 
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}