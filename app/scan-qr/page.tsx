'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { QrReader } from 'react-qr-reader'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function ScanQRPage() {
  const router = useRouter()
  const [error, setError] = useState('')

  const handleScan = (result: any) => {
    if (result) {
      // Encode the scanned data to be safely included in the URL
      const encodedData = encodeURIComponent(result.text)
      router.push(`/scan-result?data=${encodedData}`)
    }
  }

  const handleError = (error: any) => {
    setError('Failed to access camera: ' + error.message)
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black">
        <div className="flex items-center px-4 h-16">
          <Link href="/" className="mr-4">
            <ArrowLeft className="w-6 h-6 text-white" />
          </Link>
          <h1 className="text-xl font-semibold text-white">Scan QR Code</h1>
        </div>
      </header>

      {/* Scanner */}
      <div className="pt-16 relative">
        <QrReader
          constraints={{ facingMode: 'environment' }}
          onResult={handleScan}
        //   onError={handleError}
          containerStyle={{ width: '100%' }}
          videoStyle={{ objectFit: 'cover' }}
        />
        {error && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white p-4 rounded-lg">
            {error}
          </div>
        )}
      </div>
    </div>
  )
}