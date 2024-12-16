'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Image from 'next/image'
import { PointsBadge } from '../components/PointsBadge'
import { QRCodeSVG } from 'qrcode.react'

// Helper function to format date
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  // Format date to remove time component for comparison
  const dateWithoutTime = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const todayWithoutTime = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const yesterdayWithoutTime = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate())

  if (dateWithoutTime.getTime() === todayWithoutTime.getTime()) {
    return 'Today'
  } else if (dateWithoutTime.getTime() === yesterdayWithoutTime.getTime()) {
    return 'Yesterday'
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }
}

// Helper function to group rewards by date
const groupRewardsByDate = (rewards: any[]) => {
  const grouped = rewards.reduce((acc, reward) => {
    const dateKey = formatDate(reward.date)
    if (!acc[dateKey]) {
      acc[dateKey] = []
    }
    acc[dateKey].push(reward)
    return acc
  }, {})

  // Convert to array and sort by date (most recent first)
  return Object.entries(grouped).sort((a: any, b: any) => {
    const dateA = new Date(a[1][0].date)
    const dateB = new Date(b[1][0].date)
    return dateB.getTime() - dateA.getTime()
  })
}

// Mock data for reward history
const rewardHistory: any[] = [
  {
    type: 'Tukerin Produk',
    date: '2023-12-13',
    pointsFrom: 40,
    pointsTo: 0,
    merchantName: 'Sipn\'sup',
    claimCode: 'SNSP-DEFG-ZXCV',
    pointsSource: 'penukaran poin',
    productName: 'Ditukerin sama Indomie Tori Kara',
    productImage: '/tori kara.jpg',
    merchantImage: '/sipnsup.jpg',
    description: 'Enjoy a free Indomie Tori Kara with your points!',
    status: 'Belum ditukerin'
  },
  {
    type: 'Tukerin Produk',
    date: '2023-12-13',
    pointsFrom: 240,
    pointsTo: 40,
    merchantName: 'Sipn\'sup',
    claimCode: 'SNSP-DEFG-ZXCV',
    pointsSource: 'penukaran poin',
    productName: 'Ditukerin sama Nescafe 3 in 1',
    productImage: '/nescafe.jpg',
    merchantImage: '/sipnsup.jpg',
    description: 'Redeem your points for a refreshing Americano!',
    status: 'Sudah ditukerin'
  },
  {
    type: 'Klaim Poin',
    date: '2023-12-13',
    pointsFrom: 190,
    pointsTo: 240,
    merchantName: 'Sipn\'sup',
    claimCode: 'SNSP+KKCM-KKVF',
    pointsSource: 'pembelian produk',
    merchantImage: '/sipnsup.jpg',
    description: 'Points earned from purchasing Indomie Tori Kara'
  },
  {
    type: 'Klaim Poin',
    date: '2023-12-10',
    pointsFrom: 150,
    pointsTo: 190,
    merchantName: 'Sipn\'sup',
    claimCode: 'SNSP+DDKS-KOQJ',
    merchantImage: '/sipnsup.jpg',
    pointsSource: 'pembelian produk'
  },
  {
    type: 'Klaim Poin',
    date: '2023-12-9',
    pointsFrom: 0,
    pointsTo: 150,
    merchantName: 'Sipn\'sup',
    claimCode: 'SNSP+UKDJ-HBDD',
    merchantImage: '/sipnsup.jpg',
    pointsSource: 'pembelian produk'
  },
]

export default function RewardHistoryPage() {
  const groupedRewards = groupRewardsByDate(rewardHistory);

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="flex items-center px-4 h-16">
          <Link href="/" className="mr-4">
            <ArrowLeft className="w-6 h-6 text-black" />
          </Link>
          <h1 className="text-xl font-semibold text-black">Riwayat Poin</h1>
        </div>
      </header>

      <main className="pt-20 pb-6 px-4">
        <div className="space-y-8">
          {groupedRewards.map(([date, rewards]: any) => (
            <div key={date} className="space-y-4">
              <div className="flex justify-center">
                <span className="px-4 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                  {date}
                </span>
              </div>

              {rewards.map((reward: any) => (
                <Card key={reward.id} className="border border-gray-300 shadow-lg">
                  <CardContent className="p-4 z-100">
                    <div className='flex flex-col gap-4'>
                      <div className='flex flex-row gap-4 items-center'>
                        <div className="relative w-20 h-20 my-auto flex-shrink-0 border-width-2 rounded-[12px]">

                          <Image
                            src={reward.merchantImage}
                            alt={`Logo`}
                            fill
                            className="object-cover rounded-[12px] shadow-lg"
                          />
                        </div>

                        <div className="flex justify-between items-center">
                          <div className='flex flex-col gap-2 align-center'>
                            <h1 className='text-sm text-gray-600 font-semibold'>{reward.type}</h1>
                            <div className='flex flex-row gap-2 items-center'>
                              <PointsBadge points={reward.pointsFrom} size='sm' />
                              <ArrowRight className='w-4 h-4 text-gray-600' />
                              <PointsBadge points={reward.pointsTo} size='sm' />
                            </div>
                            <p className="text-sm text-gray-600 bg-gray-300 p-1 rounded-lg font-mono text-center shadow-md">{reward.claimCode}</p>
                          </div>
                        </div>
                      </div>

                      <Sheet>
                        <SheetTrigger asChild>
                          <Button
                            variant="outline"
                            className={`w-full border-gray-300 ${reward.status == 'Belum ditukerin' ? 'bg-[#FDDF23]' : ''}`}
                          >{reward.type == 'Klaim Poin' ? 'Detail sumber poin' :( reward.status == 'Belum ditukerin' ? 'Tampilkan QR buat ditukerin!' : 'Cek ditukerin sama apa')}</Button>
                        </SheetTrigger>
                        <SheetContent side="bottom" className="h-[400px]">
                          <SheetHeader>
                            <SheetTitle className="text-center">
                              {reward.type === 'Klaim Poin' ? 'Detail Klaim Poin' : 'Detail Penukaran'}
                            </SheetTitle>
                          </SheetHeader>
                          <div className="flex flex-col items-center justify-center h-full gap-6 mt-1">
                            {reward.type === 'Klaim Poin' ? (
                              <>
                                <div className='w-full flex justify-center items-center gap-4'>
                                  <div className="flex flex-col items-center">
                                    <PointsBadge points={reward.pointsFrom} size='lg' />
                                    <p className="text-xs text-gray-500 mt-2">Poin sebelumnya</p>
                                  </div>
                                  <ArrowRight className='w-6 h-6 text-gray-600' />
                                  <div className="flex flex-col items-center">
                                    <PointsBadge points={reward.pointsTo} size='lg' />
                                    <p className="text-xs text-gray-500 mt-2">Poin setelahnya</p>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className='w-full flex justify-center items-center gap-2'>
                                  <div className="flex flex-col items-center">
                                    <PointsBadge points={reward.pointsFrom} size='lg' />
                                    <p className="text-xs text-gray-500 mt-2">Poin ditukerin</p>
                                  </div>
                                  <ArrowRight className='w-6 h-6 text-gray-600' />
                                  <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                                    <Image
                                      src={reward.productImage}
                                      alt={reward.productName}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                </div>
                                <p className="text-sm font-medium text-center">
                                  {reward.productName}
                                </p>
                              </>
                            )}

                            <div className="w-full px-4">
                              <QRCodeSVG
                                value={reward.claimCode}
                                size={100}
                                level="H"
                                className="mx-auto"
                              />
                              <p className="mt-4 text-sm text-gray-600 font-mono text-center">
                                {reward.claimCode}
                              </p>
                            </div>
                          </div>
                        </SheetContent>
                      </Sheet>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

