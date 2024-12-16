'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Bell, Tag, Users, Home, QrCode, QrCodeIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useSwipeable } from 'react-swipeable'
import { PointsBadge } from './components/PointsBadge'
import ScrollContainer from 'react-indiana-drag-scroll'

// Updated mock data for promotions
const promotions = [
  {
    id: 1,
    title: "Double Points Weekend",
    description: "Earn 2x points on all purchases",
    merchant: "Coffee House Downtown",
    image: "/tuku.jpg"
  },
  {
    id: 2,
    title: "New Mango Tango Frappe",
    description: "50% off our new flavor",
    merchant: "Coffee House Mall",
    image: "/tuku.jpg"
  },
  {
    id: 3,
    title: "Loyalty Member Exclusive",
    description: "Free pastry with large coffee",
    merchant: "Coffee House Station",
    image: "/tuku.jpg"
  },
  {
    id: 4,
    title: "Morning Boost Deal",
    description: "20% off all breakfast items",
    merchant: "Coffee House Park",
    image: "/tuku.jpg"
  }
]

// Mock data for visited merchants (unchanged)
const visitedMerchants = [
  {
    id: 1,
    name: 'Sipn\'Sup',
    address: 'Jl. Ir. H. Juanda No.92',
    image: "/sipnsup.jpg",
    totalPoints: 750
  },
  {
    id: 2,
    name: 'Milk N Crumbs',
    address: 'Central Mall, 2nd Floor',
    image: "/mlkcrumbs.jpeg",
    totalPoints: 500
  },
  {
    id: 3,
    name: 'Kopi Tuku',
    address: '123 Mail Street, Downtown Area',
    image: "/tukulogo.webp",
    totalPoints: 750
  },
  {
    id: 4,
    name: 'Makmur Jaya Coffee Roaster',
    address: 'Central Station Complex',
    image: "/makmur.png",
    totalPoints: 1200
  },
  {
    id: 5,
    name: 'Wheel Coffee',
    address: 'City Park Plaza',
    image: "/wheel.jpeg",
    totalPoints: 300
  }
]

// Mock data for reward history (unchanged)
const rewardHistory = [
  {
    id: 1,
    name: 'Free Cappuccino',
    date: '2023-12-13',
    status: 'Claimed',
    points: 500
  },
  {
    id: 2,
    name: 'Discount Voucher 25%',
    date: '2023-12-10',
    status: 'Expired',
    points: 300
  },
  {
    id: 3,
    name: 'Free Pastry',
    date: '2023-12-05',
    status: 'Used',
    points: 200
  }
]

// Mock user data
const user = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  address: '123 Main St, Anytown, AN 12345',
  phone: '+1 (555) 123-4567'
}

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMerchantIndex, setCurrentMerchantIndex] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const handleSwipe = (direction: number) => {
    if (direction > 0) {
      setCurrentMerchantIndex((prev) =>
        prev === 0 ? visitedMerchants.length - 1 : prev - 1
      )
    } else {
      setCurrentMerchantIndex((prev) =>
        prev === visitedMerchants.length - 1 ? 0 : prev + 1
      )
    }
  }

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe(-1),
    onSwipedRight: () => handleSwipe(1),
    trackMouse: true
  })

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft
      const cardWidth = 280 + 12 // card width + gap
      const newIndex = Math.round(scrollLeft / cardWidth)
      setActiveIndex(newIndex)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24 flex">
      <main className="pt-6 px-4 max-w-sm mx-auto space-y-8 w-full overflow-x-hidden">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Image
            src="/tukerin.svg"
            alt="Tukerin Logo"
            width={240}
            height={80}
            className="h-auto"
            priority
          />
        </div>

        {/* Points Card Section */}
        <div className="relative w-full">
          <div
            onScroll={handleScroll}
            ref={scrollRef}
            className="overflow-x-auto py-2 snap-x snap-mandatory scroll-smooth no-scrollbar"
            style={{
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <div className="flex gap-3 w-max mx-auto">
              {visitedMerchants.map((merchant) => (
                <Card
                  key={merchant.id}
                  className="flex-none w-[25%] my-auto bg-white rounded-[20px] border-gray-200 border-width-2 hover:shadow-md transition-all duration-200 snap-center overflow-hidden"
                >
                  <div className="p-3 flex items-start gap-4">
                    {/* Merchant Logo */}
                    <div className="relative w-20 h-20 mx-auto my-auto flex-shrink-0 border border-gray-200 border-width-2 rounded-[12px]">
                      <Image
                        src={merchant.image}
                        alt={`${merchant.name} Logo`}
                        fill
                        className="object-cover rounded-[12px]"
                      />
                    </div>

                    {/* Purchase and Points Info */}
                    <div className="flex-1 -mt-0.5">
                      <h2 className="text-[#1A1A1A] text-[14px] font-medium leading-tight mb-0.5 truncate">
                        {merchant.name}
                      </h2>
                      <p className="text-[#1A1A1A]/60 text-[13px] mb-3 leading-snug">
                        {merchant.address}
                      </p>
                      <div className="rounded-lg inline-block">
                        <div className="flex items-baseline">
                          <PointsBadge
                            points={merchant.totalPoints}
                            size="lg"
                          />
                        </div>
                      </div>
                      <div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {visitedMerchants.map((_, index) => (
              <motion.div
                key={index}
                animate={{
                  width: activeIndex === index ? 16 : 4,
                  backgroundColor: activeIndex === index ? '#1A1A1A' : '#1A1A1A40'
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut"
                }}
                className="h-1 rounded-full"
              />
            ))}
          </div>
        </div>

        {/* My Membership */}
        <div>
          <h2 className="text-[#1A1A1A] text-base font-medium mb-4 px-1">My Membership</h2>
          <div className="grid grid-cols-3 gap-3">
            {visitedMerchants.map((merchant) => (
              <Link key={merchant.id} href={`/merchant/${merchant.id}`}>
                <Card className="group aspect-square bg-white rounded-[16px] hover:shadow-md transition-all duration-200 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src={merchant.image}
                      alt={merchant.name}
                      fill
                      className="object-cover rounded-[16px]"
                    />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Promotions */}
        <div>
          <h2 className="text-[#1A1A1A] text-base font-medium mb-4 px-1">Promotions</h2>
          <div className="flex gap-3 overflow-x-auto pb-4 px-4">
            {promotions.map((promo) => (
              <Card
                key={promo.id}
                className="flex-none bg-white rounded-[16px] hover:shadow-md transition-all duration-200 overflow-hidden w-[75vw] h-[240px]"
              >
                <div className="relative aspect-[2/1]">
                  <Image
                    src={promo.image}
                    alt={promo.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-[#1A1A1A] text-sm font-medium line-clamp-1">{promo.title}</h3>
                  <p className="text-[#666666] text-xs mt-1">{promo.merchant}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50">
        <div className="max-w-sm mx-auto px-4 h-20 flex items-center justify-between relative">
          {/* Left side nav items */}
          <Link href="/">
            <div className="flex flex-col items-center">
              <Home className="w-6 h-6 text-[#1A1A1A]" />
              <span className="text-xs mt-1 text-[#1A1A1A]">Home</span>
            </div>
          </Link>
          <Link href="/reward-history" className='pr-10'>
            <div className="flex flex-col items-center">
              <Tag className="w-6 h-6 text-[#1A1A1A]" />
              <span className="text-xs mt-1 text-[#1A1A1A]">Rewards</span>
            </div>
          </Link>

          {/* Center QR Scan button */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-6">
            <button
              className="border border-gray-300 border-width-2 h-16 w-16 rounded-full bg-[#FDDF23] hover:bg-[#FDDF23]/90 text-black flex flex-col items-center justify-center "
              onClick={() => router.push('/scan-qr')}
            >
              <QrCodeIcon className='w-8 h-8' />
            </button>
          </div>

          {/* Right side nav items */}
          <Link href="/notifications">
            <div className="flex flex-col items-center">
              <Bell className="w-6 h-6 text-[#1A1A1A]" />
              <span className="text-xs mt-1 text-[#1A1A1A]">Alerts</span>
            </div>
          </Link>
          <div className="flex flex-col items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="flex flex-col items-center">
                <Users className="w-6 h-6 text-[#1A1A1A]" />
                <span className="text-xs mt-1 text-[#1A1A1A]">Profile</span>
              </SheetTrigger>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  )
}

