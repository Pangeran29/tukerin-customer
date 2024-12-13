'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, MapPin, Mail, Phone, Briefcase, CheckCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Dialog, DialogContent } from '@/components/ui/dialog'

// Mock data for the merchant
const merchantData = {
  id: 1,
  name: 'Coffee House Downtown',
  pointsClaimed: 750,
  email: 'downtown@coffeehouse.com',
  phone: '+1 (555) 123-4567',
  businessField: 'Cafe & Bakery',
  address: '123 Main Street, Downtown Area',
  rewards: [
    {
      id: 1,
      title: 'Free Cappuccino',
      description: 'Enjoy a free cappuccino with any pastry purchase',
      type: 'Drink',
      pointPrice: 200,
      image: '/placeholder.svg?height=100&width=100',
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
  ]
}

export default function MerchantDetailPage() {
  const router = useRouter()
  const [selectedReward, setSelectedReward] = useState(null)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)

  const handleClaimReward = (reward) => {
    // Here you would implement the actual claim logic
    console.log(`Claiming reward: ${reward.title}`)
    // Close the sheet and show the success popup
    setSelectedReward(null)
    setShowSuccessPopup(true)
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="flex items-center px-4 h-16">
          <button onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="w-6 h-6 text-black" />
          </button>
          <h1 className="text-xl font-semibold text-black">Merchant Details</h1>
        </div>
      </header>

      <main className="pt-20 pb-6 px-4">
        <div className="flex flex-col space-y-6">
          <div>
            <Card className="border border-[#FDDF23]">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-black mb-2">{merchantData.name}</h2>
                <p className="text-lg font-medium text-[#FDDF23] mb-4">
                  {merchantData.pointsClaimed} Points Claimed
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    {merchantData.email}
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    {merchantData.phone}
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="w-4 h-4 mr-2" />
                    {merchantData.businessField}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {merchantData.address}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-black mb-4">Available Rewards</h3>
            <div className="space-y-4">
              {merchantData.rewards.map((reward) => (
                <Card key={reward.id} className="border border-[#FDDF23]">
                  <CardContent className="p-4 flex items-center">
                    <Image
                      src={reward.image}
                      alt={reward.title}
                      width={80}
                      height={80}
                      className="rounded-lg mr-4"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-black">{reward.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{reward.description}</p>
                      <p className="text-sm text-[#FDDF23] mt-1">Type: {reward.type}</p>
                      <p className="text-sm font-medium text-black mt-1">{reward.pointPrice} Points</p>
                    </div>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button 
                          className="ml-4 bg-[#FDDF23] text-black hover:bg-[#FDDF23]/80"
                          onClick={() => setSelectedReward(reward)}
                        >
                          Claim
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="bottom" className="h-[50vh] rounded-t-[10px]">
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
                            className="w-full bg-[#FDDF23] text-black hover:bg-[#FDDF23]/80"
                            onClick={() => handleClaimReward(reward)}
                          >
                            Confirm Claim
                          </Button>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <Dialog open={showSuccessPopup} onOpenChange={setShowSuccessPopup}>
          <DialogContent className="sm:max-w-[425px]">
            <div className="flex flex-col items-center justify-center p-6">
              <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
              <h2 className="text-2xl font-bold text-center mb-2">Success!</h2>
              <p className="text-center text-gray-600">
                You have successfully claimed your reward.
              </p>
              <Button
                className="mt-6 bg-[#FDDF23] text-black hover:bg-[#FDDF23]/80"
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

