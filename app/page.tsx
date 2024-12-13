'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, Bell, Tag, MapPin, ChevronRight, History, X, Users } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

// Updated mock data for promotions
const promotions = [
  {
    id: 1,
    title: "Double Points Weekend",
    description: "Earn 2x points on all purchases",
    merchant: "Coffee House Downtown",
    image: "/placeholder.svg?height=100&width=100"
  },
  {
    id: 2,
    title: "New Mango Tango Frappe",
    description: "50% off our new flavor",
    merchant: "Coffee House Mall",
    image: "/placeholder.svg?height=100&width=100"
  },
  {
    id: 3,
    title: "Loyalty Member Exclusive",
    description: "Free pastry with large coffee",
    merchant: "Coffee House Station",
    image: "/placeholder.svg?height=100&width=100"
  },
  {
    id: 4,
    title: "Morning Boost Deal",
    description: "20% off all breakfast items",
    merchant: "Coffee House Park",
    image: "/placeholder.svg?height=100&width=100"
  }
]

// Mock data for visited merchants (unchanged)
const visitedMerchants = [
  {
    id: 1,
    name: 'Coffee House Downtown',
    address: '123 Main Street, Downtown Area',
    image: "/placeholder.svg?height=100&width=100",
    totalPoints: 750
  },
  {
    id: 2,
    name: 'Coffee House Mall',
    address: 'Central Mall, 2nd Floor',
    image: "/placeholder.svg?height=100&width=100",
    totalPoints: 500
  },
  {
    id: 3,
    name: 'Coffee House Station',
    address: 'Central Station Complex',
    image: "/placeholder.svg?height=100&width=100",
    totalPoints: 1200
  },
  {
    id: 4,
    name: 'Coffee House Park',
    address: 'City Park Plaza',
    image: "/placeholder.svg?height=100&width=100",
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
  const router = useRouter()

  const handleLogout = () => {
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between px-4 h-16">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Users className="w-6 h-6 text-black" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-white">
              <SheetHeader>
                <SheetTitle className="text-black">User Profile</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="font-semibold text-black">Name</h3>
                  <p className="text-gray-600">{user.name}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-black">Email</h3>
                  <p className="text-gray-600">{user.email}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-black">Address</h3>
                  <p className="text-gray-600">{user.address}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-black">Phone</h3>
                  <p className="text-gray-600">{user.phone}</p>
                </div>
                <Link href="/update-profile">
                  <Button className="w-full bg-[#FDDF23] text-black hover:bg-[#FDDF23]/80">
                    Update Information
                  </Button>
                </Link>
                <Button 
                  className="w-full mt-4 bg-red-500 text-white hover:bg-red-600"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-4">
            <Link href="/reward-history">
              <Tag className="w-6 h-6 text-black" />
            </Link>
            <Link href="/notifications">
              <Bell className="w-6 h-6 text-black" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 pb-6 px-4">
        {/* Promotions Banner */}
        <div className="mt-6 overflow-x-auto">
          <div className="flex space-x-4 pb-4">
            {promotions.map((promo) => (
              <Card key={promo.id} className="flex-shrink-0 w-[280px] h-[140px] border border-[#FDDF23]">
                <CardContent className="p-4 flex items-center">
                  <Image
                    src={promo.image}
                    alt={promo.title}
                    width={80}
                    height={80}
                    className="rounded-lg mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-black text-sm">{promo.title}</h3>
                    <p className="text-xs text-gray-600 mt-1">{promo.description}</p>
                    <p className="text-xs text-[#FDDF23] mt-2">{promo.merchant}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Points Card */}
        <Card className="mt-6 bg-[#FDDF23]">
          <CardContent className="p-6">
            <h2 className="text-black text-lg font-semibold mb-2">Your Points</h2>
            <div className="flex items-baseline">
              <span className="text-4xl font-bold text-black">2,500</span>
              <span className="ml-2 text-sm text-black/70">points</span>
            </div>
            <p className="mt-2 text-sm text-black/70">Valid until Dec 31, 2024</p>
          </CardContent>
        </Card>

        {/* Visited Merchants Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-black mb-4">Your Visited Merchants</h2>
          <div className="space-y-4">
            {visitedMerchants.map((merchant) => (
              <Card key={merchant.id} className="border border-[#FDDF23]">
                <Link href={`/merchant/${merchant.id}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <Image
                        src={merchant.image}
                        alt={merchant.name}
                        width={60}
                        height={60}
                        className="rounded-lg mr-4"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-black">{merchant.name}</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          {merchant.address}
                        </div>
                        <p className="text-sm font-medium text-[#FDDF23] mt-1">
                          {merchant.totalPoints} Points Earned
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

