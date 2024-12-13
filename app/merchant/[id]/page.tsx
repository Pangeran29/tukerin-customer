'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, MapPin, Mail, Phone, Briefcase, CheckCircle, icons } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Dialog, DialogContent } from '@/components/ui/dialog'

// Mock data for the merchant
const merchantData = {
  id: 1,
  name: 'Coffee House Downtown',
  pointsClaimed: 750,
  rating: 4.8,
  reviewCount: 128,
  operationalHours: '07:00 - 22:00',
  email: 'downtown@coffeehouse.com',
  phone: '+1 (555) 123-4567',
  businessField: 'Cafe & Bakery',
  address: '123 Main Street, Downtown Area',
  tags: ['Coffee', 'Breakfast', 'Lunch', 'Wifi', 'Pet Friendly'],
  description: 'A cozy coffee shop serving specialty coffee and fresh pastries. Perfect spot for work or casual meetings.',
  rewards: [
    {
      id: 1,
      title: 'Free Cappuccino',
      description: 'Enjoy a free cappuccino with any pastry purchase',
      type: 'Drink',
      pointPrice: 200,
      image: '/tuku.png?height=100&width=100',
      tnc: 'Valid for one cappuccino per visit. Must be redeemed with a pastry purchase. Cannot be combined with other offers.'
    },
    {
      id: 2,
      title: '25% Off Lunch Set',
      description: 'Get 25% off on any lunch set menu item',
      type: 'Discount',
      pointPrice: 300,
      image: '/placeholder.svg?height=100&width=100',
      tnc: 'Valid for one lunch set per visit. Discount applies to regular-priced items only. Cannot be combined with other offers.'
    },
    {
      id: 3,
      title: 'Exclusive Coffee Mug',
      description: 'Claim a limited edition Coffee House mug',
      type: 'Merchandise',
      pointPrice: 500,
      image: '/placeholder.svg?height=100&width=100',
      tnc: 'Limited to one mug per customer. While supplies last. Must be claimed in-store.'
    }
  ],
  popularItems: [
    { name: 'Cappuccino', price: '$4.50', image: '/tuku.jpg' },
    { name: 'Croissant', price: '$3.50', image: '/tuku.jpg' },
    { name: 'Latte', price: '$4.00', image: '/tuku.jpg' },
  ]
}

// Material You inspired color system
const colors = {
  primary: '#FDDF23',
  primaryContainer: '#FEF9E7',
  surface: {
    1: 'white',
    2: '#FAFAFA',
    3: '#F5F5F5',
  },
  outline: 'rgba(0, 0, 0, 0.12)',
  elevation: {
    1: '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
    2: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
    3: '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)',
  }
};

export default function MerchantDetailPage() {
  const router = useRouter()
  const [selectedReward, setSelectedReward] = useState(null)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)

  const handleClaimReward = (reward: { title: string, image: string, description: string, type: string, pointPrice: string, tnc: string }) => {
    // Here you would implement the actual claim logic
    console.log(`Claiming reward: ${reward.title}`)
    // Close the sheet and show the success popup
    setSelectedReward(null)
    setShowSuccessPopup(true)
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Material You top app bar */}
      <header className="mx-auto max-w-sm fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md supports-[backdrop-filter]:bg-white/70">
        <div className="flex items-center px-4 h-16">
          <button 
            onClick={() => router.back()} 
            className="mr-4 p-2 rounded-full hover:bg-black/5 active:bg-black/10 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[#1A1A1A]" />
          </button>
          <h1 className="text-[1.375rem] font-medium text-[#1A1A1A]">Merchant Details</h1>
        </div>
      </header>

      <main className="pt-20 pb-6 px-4 space-y-6">
        {/* Hero Image */}
        <div className="relative h-48 rounded-[28px] overflow-hidden shadow-md">
          <Image
            src="/tuku.jpg"
            alt={merchantData.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Merchant Card with enhanced info */}
        <Card className="border-none bg-white rounded-[28px] shadow-md hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-[1.75rem] font-medium text-[#1A1A1A] mb-2">{merchantData.name}</h2>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    <icons.Star className="w-5 h-5 fill-[#FDDF23] text-[#FDDF23]" />
                    <span className="ml-1 font-medium">{merchantData.rating}</span>
                  </div>
                  <span className="text-[#666666]">({merchantData.reviewCount} reviews)</span>
                </div>
              </div>
              <div className="bg-[#FDDF23] rounded-full px-4 py-1.5 shadow-sm">
                <p className="text-sm font-medium text-[#1A1A1A]">
                  {merchantData.pointsClaimed} Points
                </p>
              </div>
            </div>

            <p className="text-[#666666] mb-4">{merchantData.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {merchantData.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-[#F5F5F5] rounded-full text-sm text-[#666666]">
                  {tag}
                </span>
              ))}
            </div>

            {/* Operating Hours */}
            <div className="flex items-center p-3 bg-[#FEF9E7] rounded-2xl mb-6">
              <icons.Clock className="w-5 h-5 mr-3 text-[#1A1A1A]" />
              <div>
                <p className="text-sm font-medium text-[#1A1A1A]">Open Today</p>
                <p className="text-sm text-[#666666]">{merchantData.operationalHours}</p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 text-[0.875rem] text-[#666666]">
              {/* Contact info with larger touch targets */}
              <button className="flex items-center w-full p-2 rounded-full hover:bg-black/5 active:bg-black/10 transition-colors">
                <Mail className="w-5 h-5 mr-3" />
                {merchantData.email}
              </button>
              <button className="flex items-center w-full p-2 rounded-full hover:bg-black/5 active:bg-black/10 transition-colors">
                <Phone className="w-5 h-5 mr-3" />
                {merchantData.phone}
              </button>
              <button className="flex items-center w-full p-2 rounded-full hover:bg-black/5 active:bg-black/10 transition-colors">
                <Briefcase className="w-5 h-5 mr-3" />
                {merchantData.businessField}
              </button>
              <button className="flex items-center w-full p-2 rounded-full hover:bg-black/5 active:bg-black/10 transition-colors">
                <MapPin className="w-5 h-5 mr-3" />
                {merchantData.address}
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Popular Items Section */}
        <div>
          <h3 className="text-[1.375rem] font-medium text-[#1A1A1A] mb-4 px-2">Popular Items</h3>
          <div className="flex gap-4 overflow-x-auto pb-4 px-2 -mx-2">
            {merchantData.popularItems.map((item, index) => (
              <div key={index} className="flex-none w-32">
                <div className="relative h-32 rounded-2xl overflow-hidden shadow-sm mb-2">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="font-medium text-sm text-[#1A1A1A]">{item.name}</p>
                <p className="text-sm text-[#666666]">{item.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Rewards Section */}
        <div>
          <h3 className="text-[1.375rem] font-medium text-[#1A1A1A] mb-4 px-2">Available Rewards</h3>
          <div className="space-y-4">
            {merchantData.rewards.map((reward) => (
              <Card 
                key={reward.id} 
                className="border-none bg-white rounded-[24px] shadow-md hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-0">
                  <Image
                    src="/tuku.jpg"
                    alt={reward.title}
                    width={50}
                    height={100}
                    className="rounded-t-[24px] w-full h-48 object-cover"
                  />
                  <div className='p-6'>
                    <div className="flex-1 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-[1rem] font-medium text-[#1A1A1A]">{reward.title}</h4>
                        <icons.GlassWater className="w-5 h-5 text-[#666666]"/>
                      </div>
                      <p className="text-[0.875rem] font-medium text-[#1A1A1A] mb-2">{reward.pointPrice} Points</p>
                      <p className="text-[0.875rem] text-[#666666]">{reward.description}</p>
                    </div>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button
                          className="bg-[#FDDF23] text-black hover:bg-[#FDDF23]/90 active:bg-[#FDDF23]/80 
                                   shadow-sm hover:shadow-md transition-all duration-200 
                                   rounded-full h-12 text-[0.875rem] font-medium w-full"
                          onClick={() => setSelectedReward(reward as any)}
                        >
                          Claim Reward
                        </Button>
                      </SheetTrigger>
                      <SheetContent 
                        side="bottom" 
                        className="h-[50vh] rounded-t-[28px] bg-white"
                      >
                        <SheetHeader>
                          <SheetTitle>{reward.title}</SheetTitle>
                        </SheetHeader>
                        <div className="mt-4 space-y-4">
                          <p className="text-sm text-gray-600">{reward.description}</p>
                          <p className="text-sm"><span className="font-semibold">Type:</span> {reward.type}</p>
                          <p className="text-sm"><span className="font-semibold">Points Required:</span> {reward.pointPrice}</p>
                          <div>
                            <h5 className="font-semibold mb-2">Terms and Conditions:</h5>
                            <p className="text-sm text-gray-600">{reward.tnc}</p>
                          </div>
                          <Button
                            className="w-full bg-[#FDDF23] text-black hover:bg-[#FDDF23]/80 shadow-md hover:shadow-lg transition-all duration-200 mt-2 w-full"
                            onClick={() => handleClaimReward(reward as any)}
                          >
                            Confirm Claim
                          </Button>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Success Dialog */}
        <Dialog open={showSuccessPopup} onOpenChange={setShowSuccessPopup}>
          <DialogContent className="sm:max-w-[425px] rounded-[28px] p-6">
            <div className="flex flex-col items-center justify-center">
              <CheckCircle className="w-16 h-16 text-[#FDDF23] mb-6" />
              <h2 className="text-[1.5rem] font-medium text-center mb-2">Success!</h2>
              <p className="text-center text-[#666666] text-[0.875rem] mb-6">
                You have successfully claimed your reward.
              </p>
              <Button
                className="bg-[#FDDF23] text-black hover:bg-[#FDDF23]/90 active:bg-[#FDDF23]/80 
                         shadow-sm hover:shadow-md transition-all duration-200 
                         rounded-full h-12 text-[0.875rem] font-medium w-full"
                onClick={() => setShowSuccessPopup(false)}
              >
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}

