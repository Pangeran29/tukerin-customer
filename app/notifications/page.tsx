'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

// Mock data for notifications
const notifications = [
  {
    id: 1,
    type: 'point_claim',
    title: 'Points Claimed',
    description: 'You have successfully claimed 500 points',
    date: '2023-12-15',
    merchant: 'Coffee House Downtown'
  },
  {
    id: 2,
    type: 'new_banner',
    title: 'New Promotion: Summer Special',
    description: 'Check out our new summer drinks promotion!',
    date: '2023-12-14'
  },
  {
    id: 3,
    type: 'point_claim',
    title: 'Points Claimed',
    description: 'You have successfully claimed 300 points',
    date: '2023-12-13',
    merchant: 'Coffee House Mall'
  },
  {
    id: 4,
    type: 'new_banner',
    title: 'New Loyalty Program',
    description: 'We\'ve updated our loyalty program. See what\'s new!',
    date: '2023-12-12'
  }
]

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="flex items-center px-4 h-16">
          <Link href="/" className="mr-4">
            <ArrowLeft className="w-6 h-6 text-black" />
          </Link>
          <h1 className="text-xl font-semibold text-black">Notifications</h1>
        </div>
      </header>

      <main className="pt-20 pb-6 px-4">
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card key={notification.id} className="border border-[#FDDF23]">
              <CardContent className="p-4">
                <h3 className="font-semibold text-black">{notification.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                <p className="text-sm text-gray-500 mt-2">Date: {notification.date}</p>
                {notification.type === 'point_claim' && (
                  <p className="text-sm text-[#FDDF23] mt-1">Merchant: {notification.merchant}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

