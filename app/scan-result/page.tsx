'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Suspense } from 'react'

function ScanResultContent() {
  const searchParams = useSearchParams()
  const scannedData = searchParams.get('data')

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="flex items-center px-4 h-16">
          <Link href="/" className="mr-4">
            <ArrowLeft className="w-6 h-6 text-black" />
          </Link>
          <h1 className="text-xl font-semibold text-black">Scan Result</h1>
        </div>
      </header>

      <main className="pt-20 px-4">
        <Card className="bg-white">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Scanned QR Code Content:</h2>
            <p className="text-gray-700 break-all">{scannedData}</p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default function ScanResultPage() {
  return (
    <Suspense>
      <ScanResultContent />
    </Suspense>
  )
}