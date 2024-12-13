'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

// Mock data for reward history
const rewardHistory = [
  {
    id: 1,
    name: 'Free Cappuccino',
    date: '2023-12-13',
    status: 'Claimed',
    points: 500,
    type: 'Voucher',
    merchant: 'Coffee House Downtown',
    code: 'CAPC123XYZ'
  },
  {
    id: 2,
    name: 'Discount Voucher 25%',
    date: '2023-12-10',
    status: 'Expired',
    points: 300,
    type: 'Voucher',
    merchant: 'Coffee House Mall',
    code: 'DISC25ABC'
  },
  {
    id: 3,
    name: 'Limited Edition Mug',
    date: '2023-12-05',
    status: 'Used',
    points: 1000,
    type: 'Physical Good',
    merchant: 'Coffee House Station',
    code: 'MUG789DEF'
  }
]

export default function RewardHistoryPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="flex items-center px-4 h-16">
          <Link href="/" className="mr-4">
            <ArrowLeft className="w-6 h-6 text-black" />
          </Link>
          <h1 className="text-xl font-semibold text-black">Reward History</h1>
        </div>
      </header>

      <main className="pt-20 pb-6 px-4">
        <div className="space-y-4">
          {rewardHistory.map((reward) => (
            <Card key={reward.id} className="border border-[#FDDF23]">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-black">{reward.name}</h3>
                    <p className="text-sm text-gray-500">{reward.date}</p>
                    <p className="text-sm font-medium text-[#FDDF23]">{reward.points} Points</p>
                    <p className="text-sm text-gray-600 mt-1">Type: {reward.type}</p>
                    <p className="text-sm text-gray-600">Merchant: {reward.merchant}</p>
                    <p className="text-sm text-gray-600">Code: {reward.code}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      reward.status === 'Claimed' ? 'bg-green-100 text-green-800' :
                      reward.status === 'Expired' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {reward.status}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

