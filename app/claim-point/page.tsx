'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ArrowRight, Bell, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

// Mock data for the claim
const claimData = {
  merchant: 'Kuro coffe',
  purchase: 'Pembelian 2 mocca coffe dan 1 frapucino',
  points: 50
}

export default function ClaimPointPage() {
  const router = useRouter()
  const [isClaiming, setIsClaiming] = useState(false)

  const handleClaim = () => {
    setIsClaiming(true)
    // Simulate API call
    setTimeout(() => {
      router.push('/')
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Image */}
      <Image
        src="/placeholder.svg?height=1000&width=1000"
        alt="Coffee Shop Background"
        layout="fill"
        objectFit="cover"
        className="opacity-30"
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Main Content */}
        <main className="px-4 pt-8">
          <div className="bg-white rounded-lg p-6 mb-6 shadow-md">
            <h1 className="text-2xl font-bold text-black mb-4">
              Claim Your Points
            </h1>
            <p className="text-gray-600 mb-4">
              You're just a step away from boosting your rewards! Claim your points now and unlock exciting perks.
            </p>
            <p className="text-sm text-gray-500 mb-2">
              Remember:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-500 mb-4">
              <li>Points are credited instantly to your account</li>
              <li>Use your points for exclusive discounts and free items</li>
              <li>The more you claim, the faster you'll reach premium status</li>
            </ul>
          </div>

          <Card className="border-[#FDDF23] mb-6">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-black mb-2">{claimData.merchant}</h2>
              <p className="text-gray-600 mb-4">{claimData.purchase}</p>
              <div className="bg-[#FDDF23] p-4 rounded-lg text-center">
                <p className="text-sm font-semibold text-black mb-1">Points you'll earn:</p>
                <p className="text-5xl font-bold text-black">{claimData.points}</p>
              </div>
            </CardContent>
          </Card>

          <p className="text-sm text-gray-600 mb-4 text-center">
            By claiming these points, you agree to our terms and conditions.
          </p>

          <Button
            onClick={handleClaim}
            disabled={isClaiming}
            className="w-full bg-[#FDDF23] text-black hover:bg-[#FDDF23]/80 py-6 text-lg font-semibold"
          >
            {isClaiming ? 'Claiming...' : 'Claim Your Points Now'}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </main>
      </div>
    </div>
  )
}

