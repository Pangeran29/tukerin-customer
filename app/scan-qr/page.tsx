'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Scanner } from '@yudiel/react-qr-scanner'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function ScanQRPage() {
  const router = useRouter()
  const [error, setError] = useState('')

  const handleScan = (result: any) => {
    if (result) {
      // Encode the scanned data to be safely included in the URL
      const encodedData = encodeURIComponent(result[0].rawValue)
      router.push(`/scan-result?data=${encodedData}`)
    }
  }

  return (
    <div className="min-h-screen w-full h-full flex flex-row">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center px-4 h-16">
          <Link href="/" className="mr-4">
            <ArrowLeft className="w-6 h-6 text-black" />
          </Link>
        </div>
      </header>

      {/* Scanner */}
      <div className='my-auto'>
        <div className="w-full h-full">
          <div className="flex justify-center mb-4">
            <Image
              src="/tukerin.svg"
              alt="Tukerin Logo"
              width={200}
              height={70}
              className="h-auto"
              priority
            />
          </div>
          <Scanner
            onScan={handleScan}
            onError={(error) => setError(error?.message || 'An error occurred')}
            components={{
              finder: false // This removes the default finder UI for a cleaner look
            }}
            styles={{
              container: {
                position: 'relative',
                borderRadius: '10px',
                border: '1px solid #9e9e9e'
              },
              video: {
                width: 'calc(min(100vw, 100vh))',
                height: 'calc(min(100vw, 100vh))',
                objectFit: 'cover',
                borderRadius: '10px'
              }
            }}
          />
        </div>
        {error && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white p-4 rounded-lg z-50">
            {error}
          </div>
        )}
        <div className='text-center text-sm text-gray-500 mt-4'>
          Scan the QR code that you received from the merchant or input the code below
        </div>
        <div className='flex flex-row justify-center items-center mt-4'>
          <Input
            placeholder='Input the code here'
            className='w-full max-w-xs rounded-r-none'
          />
          <Button className='rounded-l-none'>
            <ArrowRight className='w-6 h-6 rounded-r-none' />
          </Button>
        </div>
      </div>
    </div>
  )
}