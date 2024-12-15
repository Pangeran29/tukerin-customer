'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ArrowLeft, Clock, icons } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Dialog, DialogContent } from '@/components/ui/dialog'

// Simplified merchant data
const merchantData = {
  id: 1,
  name: 'Sipn\'Sup',
  pointsClaimed: 750,
  operationalHours: '07:00 - 22:00',
  description: 'Restoran self-service dengan view kota.',
  image: '/sipnsup.jpg',
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

export default function MerchantDetailPage() {
  const router = useRouter()
  const [selectedReward, setSelectedReward] = useState(null)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 600) // Adjust this value based on when you want the header to appear
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClaimReward = (reward) => {
    setSelectedReward(null)
    setShowSuccessPopup(true)
  }

  return (
    <div className="min-h-screen w-screen bg-[#FAFAFA]">
      {/* Dynamic Header */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
          }`}
      >
        <div className="relative h-16 bg-white shadow-md">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 opacity-30">
            <Image
              src="/sipnsup2.jpg"
              alt={merchantData.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Header Content */}
          <div className="relative flex items-center px-4 h-full">
            <button
              onClick={() => router.back()}
              className="mr-4 p-2 rounded-full hover:bg-black/5"
            >
              <ArrowLeft className="w-6 h-6 text-black" />
            </button>


            {/* Merchant Name  and logo*/}
            <div className='flex items-center gap-2 justify-between w-full'>
              <div className="relative min-w-8 min-h-8 rounded-lg overflow-hidden mr-3">
                <Image
                  src={merchantData.image}
                  alt={merchantData.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="bg-[#FDDF23] rounded-xl px-3 py-1">
                <p className="text-sm font-medium text-[#1A1A1A]">
                  {merchantData.pointsClaimed} points
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Hero Section with Smooth Blend */}
      <div className="relative h-[80vh]">
        <Image
          src="/sipnsup2.jpg"
          alt={merchantData.name}
          fill
          className="object-cover"
        />
        {/* Double gradient overlay: dark at top, white at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white via-10% to-100%" />

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-40">
          <div className="flex items-center px-4 h-16">
            <button
              onClick={() => router.back()}
              className="mr-4 p-2 rounded-full bg-white/10 backdrop-blur-md"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>

      <main className="px-4 -mt-[60vw] relative z-10 ">

        <div className='flex flex-row items-center gap-4 my-4 '>
          <div className="relative w-20 h-20 my-auto flex-shrink-0 border-width-2 rounded-[12px]">
            <Image
              src={merchantData.image}
              alt={`${merchantData.name} Logo`}
              fill
              className="object-cover rounded-[12px]"
            />
            <div className="absolute -top-2 -left-2 bg-[#FDDF23] rounded-xl px-3 py-1 shadow-md">
              <p className="text-sm font-medium text-[#1A1A1A]">
                {merchantData.pointsClaimed} pts
              </p>
            </div>
          </div>
          <div className='flex flex-col gap-1'>
            <div className='flex flex-row items-center justify-between gap-2'>
              <p className='text-2xl font-bold'> Sipn'Sup</p>
            </div>

            <p className='text-sm font-medium'>{merchantData.description}</p>
            <div className="flex items-center text-sm font-medium">
              <Clock className="w-4 h-4 mr-2" />
              {merchantData.operationalHours}
            </div>

          </div>
        </div>
        {/* Points and Hours Card */}
        <Card className="border border-gray-300 bg-white rounded-[28px] shadow-lg mb-8 mt-16">
          <CardContent className="p-8">
            <div className='text-md font-bold border border-gray-300 border-width-16 text-center rounded-full px-4 py-1 w-fit mx-auto -mt-12 bg-white shadow-lg'>Yuk, Tukerin poin-mu disini!</div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 mt-8">

              <Sheet>
                <SheetTrigger asChild>
                  <div className="relative cursor-pointer group">
                    <div className='bg-[#FDDF23] text-black text-center text-xs font-medium py-1 rounded-full -mt-2 z-10 w-fit px-2 border border-gray-300 absolute right-2'>
                      200 pts
                    </div>
                    <div className='w-full aspect-square border border-gray-300 rounded-md overflow-hidden group-hover:shadow-lg transition-all'>
                      <Image 
                        src='/tori kara.jpg' 
                        alt='Tori Kara' 
                        className='object-cover w-full h-full group-hover:scale-105 transition-transform' 
                        width={200} 
                        height={200} 
                      />
                    </div>
                    <p className="text-sm font-medium mt-2">Tori Kara</p>
                    <p className="text-xs text-gray-500">Free with any purchase</p>
                  </div>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[50vh] rounded-t-[28px] bg-white w-full">
                  <SheetHeader>
                    <SheetTitle>Free Indomie Tori Kara</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4 space-y-4 w-full">
                    <Image 
                      src='/tori kara.jpg' 
                      alt='tori kara' 
                      width={100} 
                      height={100} 
                      className="rounded-lg mx-auto"
                    />
                    <p className="text-sm text-gray-600">Enjoy a free Indomie Tori Kara</p>
                    <div>
                      <h5 className="font-semibold mb-2">Terms and Conditions:</h5>
                      <ul className="text-sm text-gray-600 list-disc pl-4 space-y-1">
                        <li>Valid for one redemption per visit</li>
                        <li>Available for any size</li>
                        <li>Cannot be combined with other promotions</li>
                        <li>Valid until 31 December 2024</li>
                      </ul>
                    </div>
                    <Button
                      className="w-full bg-[#FDDF23] text-black hover:bg-[#FDDF23]/80 shadow-md hover:shadow-lg transition-all duration-200"
                      onClick={() => handleClaimReward({ id: 2, title: 'Americano' })}
                    >
                      Claim Reward (300 pts)
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Second Reward Item */}
              <Sheet>
                <SheetTrigger asChild>
                  <div className="relative cursor-pointer group">
                    <div className='bg-[#FDDF23] text-black text-center text-xs font-medium py-1 rounded-full -mt-2 z-10 w-fit px-2 border border-gray-300 absolute right-2'>
                      300 pts
                    </div>
                    <div className='w-full aspect-square border border-gray-300 rounded-md overflow-hidden group-hover:shadow-lg transition-all'>
                      <Image 
                        src='/nescafe.jpg' 
                        alt='Americano' 
                        className='object-cover w-full h-full group-hover:scale-105 transition-transform' 
                        width={200} 
                        height={200} 
                      />
                    </div>
                    <p className="text-sm font-medium mt-2">Americano</p>
                    <p className="text-xs text-gray-500">Any size</p>
                  </div>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[50vh] rounded-t-[28px] bg-white w-full">
                  <SheetHeader>
                    <SheetTitle>Free Americano</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4 space-y-4 w-full">
                    <Image 
                      src='/nescafe.jpg' 
                      alt='Americano' 
                      width={100} 
                      height={100} 
                      className="rounded-lg mx-auto"
                    />
                    <p className="text-sm text-gray-600">Enjoy a free Americano of any size</p>
                    <div>
                      <h5 className="font-semibold mb-2">Terms and Conditions:</h5>
                      <ul className="text-sm text-gray-600 list-disc pl-4 space-y-1">
                        <li>Valid for one redemption per visit</li>
                        <li>Available for any size</li>
                        <li>Cannot be combined with other promotions</li>
                        <li>Valid until 31 December 2024</li>
                      </ul>
                    </div>
                    <Button
                      className="w-full bg-[#FDDF23] text-black hover:bg-[#FDDF23]/80 shadow-md hover:shadow-lg transition-all duration-200"
                      onClick={() => handleClaimReward({ id: 2, title: 'Americano' })}
                    >
                      Claim Reward (300 pts)
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
              <Sheet>
                <SheetTrigger asChild>
                  <div className="relative cursor-pointer group">
                    <div className='bg-[#FDDF23] text-black text-center text-xs font-medium py-1 rounded-full -mt-2 z-10 w-fit px-2 border border-gray-300 absolute right-2'>
                      200 pts
                    </div>
                    <div className='w-full aspect-square border border-gray-300 rounded-md overflow-hidden group-hover:shadow-lg transition-all'>
                      <Image 
                        src='/tori kara.jpg' 
                        alt='Tori Kara' 
                        className='object-cover w-full h-full group-hover:scale-105 transition-transform' 
                        width={200} 
                        height={200} 
                      />
                    </div>
                    <p className="text-sm font-medium mt-2">Tori Kara</p>
                    <p className="text-xs text-gray-500">Free with any purchase</p>
                  </div>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[50vh] rounded-t-[28px] bg-white w-full">
                  <SheetHeader>
                    <SheetTitle>Free Indomie Tori Kara</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4 space-y-4 w-full">
                    <Image 
                      src='/tori kara.jpg' 
                      alt='tori kara' 
                      width={100} 
                      height={100} 
                      className="rounded-lg mx-auto"
                    />
                    <p className="text-sm text-gray-600">Enjoy a free Indomie Tori Kara</p>
                    <div>
                      <h5 className="font-semibold mb-2">Terms and Conditions:</h5>
                      <ul className="text-sm text-gray-600 list-disc pl-4 space-y-1">
                        <li>Valid for one redemption per visit</li>
                        <li>Available for any size</li>
                        <li>Cannot be combined with other promotions</li>
                        <li>Valid until 31 December 2024</li>
                      </ul>
                    </div>
                    <Button
                      className="w-full bg-[#FDDF23] text-black hover:bg-[#FDDF23]/80 shadow-md hover:shadow-lg transition-all duration-200"
                      onClick={() => handleClaimReward({ id: 2, title: 'Americano' })}
                    >
                      Claim Reward (300 pts)
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Second Reward Item */}
              <Sheet>
                <SheetTrigger asChild>
                  <div className="relative cursor-pointer group">
                    <div className='bg-[#FDDF23] text-black text-center text-xs font-medium py-1 rounded-full -mt-2 z-10 w-fit px-2 border border-gray-300 absolute right-2'>
                      300 pts
                    </div>
                    <div className='w-full aspect-square border border-gray-300 rounded-md overflow-hidden group-hover:shadow-lg transition-all'>
                      <Image 
                        src='/nescafe.jpg' 
                        alt='Americano' 
                        className='object-cover w-full h-full group-hover:scale-105 transition-transform' 
                        width={200} 
                        height={200} 
                      />
                    </div>
                    <p className="text-sm font-medium mt-2">Americano</p>
                    <p className="text-xs text-gray-500">Any size</p>
                  </div>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[50vh] rounded-t-[28px] bg-white w-full">
                  <SheetHeader>
                    <SheetTitle>Free Americano</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4 space-y-4 w-full">
                    <Image 
                      src='/nescafe.jpg' 
                      alt='Americano' 
                      width={100} 
                      height={100} 
                      className="rounded-lg mx-auto"
                    />
                    <p className="text-sm text-gray-600">Enjoy a free Americano of any size</p>
                    <div>
                      <h5 className="font-semibold mb-2">Terms and Conditions:</h5>
                      <ul className="text-sm text-gray-600 list-disc pl-4 space-y-1">
                        <li>Valid for one redemption per visit</li>
                        <li>Available for any size</li>
                        <li>Cannot be combined with other promotions</li>
                        <li>Valid until 31 December 2024</li>
                      </ul>
                    </div>
                    <Button
                      className="w-full bg-[#FDDF23] text-black hover:bg-[#FDDF23]/80 shadow-md hover:shadow-lg transition-all duration-200"
                      onClick={() => handleClaimReward({ id: 2, title: 'Americano' })}
                    >
                      Claim Reward (300 pts)
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
              <Sheet>
                <SheetTrigger asChild>
                  <div className="relative cursor-pointer group">
                    <div className='bg-[#FDDF23] text-black text-center text-xs font-medium py-1 rounded-full -mt-2 z-10 w-fit px-2 border border-gray-300 absolute right-2'>
                      200 pts
                    </div>
                    <div className='w-full aspect-square border border-gray-300 rounded-md overflow-hidden group-hover:shadow-lg transition-all'>
                      <Image
                        src='/tori kara.jpg'
                        alt='Tori Kara'
                        className='object-cover w-full h-full group-hover:scale-105 transition-transform'
                        width={200}
                        height={200}
                      />
                    </div>
                    <p className="text-sm font-medium mt-2">Tori Kara</p>
                    <p className="text-xs text-gray-500">Free with any purchase</p>
                  </div>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[50vh] rounded-t-[28px] bg-white w-full">
                  <SheetHeader>
                    <SheetTitle>Free Indomie Tori Kara</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4 space-y-4 w-full">
                    <Image
                      src='/tori kara.jpg'
                      alt='tori kara'
                      width={100}
                      height={100}
                      className="rounded-lg mx-auto"
                    />
                    <p className="text-sm text-gray-600">Enjoy a free Indomie Tori Kara</p>
                    <div>
                      <h5 className="font-semibold mb-2">Terms and Conditions:</h5>
                      <ul className="text-sm text-gray-600 list-disc pl-4 space-y-1">
                        <li>Valid for one redemption per visit</li>
                        <li>Available for any size</li>
                        <li>Cannot be combined with other promotions</li>
                        <li>Valid until 31 December 2024</li>
                      </ul>
                    </div>
                    <Button
                      className="w-full bg-[#FDDF23] text-black hover:bg-[#FDDF23]/80 shadow-md hover:shadow-lg transition-all duration-200"
                      onClick={() => handleClaimReward({ id: 2, title: 'Americano' })}
                    >
                      Claim Reward (300 pts)
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Second Reward Item */}
              <Sheet>
                <SheetTrigger asChild>
                  <div className="relative cursor-pointer group">
                    <div className='bg-[#FDDF23] text-black text-center text-xs font-medium py-1 rounded-full -mt-2 z-10 w-fit px-2 border border-gray-300 absolute right-2'>
                      300 pts
                    </div>
                    <div className='w-full aspect-square border border-gray-300 rounded-md overflow-hidden group-hover:shadow-lg transition-all'>
                      <Image
                        src='/nescafe.jpg'
                        alt='Americano'
                        className='object-cover w-full h-full group-hover:scale-105 transition-transform'
                        width={200}
                        height={200}
                      />
                    </div>
                    <p className="text-sm font-medium mt-2">Americano</p>
                    <p className="text-xs text-gray-500">Any size</p>
                  </div>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[50vh] rounded-t-[28px] bg-white w-full">
                  <SheetHeader>
                    <SheetTitle>Free Americano</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4 space-y-4 w-full">
                    <Image
                      src='/nescafe.jpg'
                      alt='Americano'
                      width={100}
                      height={100}
                      className="rounded-lg mx-auto"
                    />
                    <p className="text-sm text-gray-600">Enjoy a free Americano of any size</p>
                    <div>
                      <h5 className="font-semibold mb-2">Terms and Conditions:</h5>
                      <ul className="text-sm text-gray-600 list-disc pl-4 space-y-1">
                        <li>Valid for one redemption per visit</li>
                        <li>Available for any size</li>
                        <li>Cannot be combined with other promotions</li>
                        <li>Valid until 31 December 2024</li>
                      </ul>
                    </div>
                    <Button
                      className="w-full bg-[#FDDF23] text-black hover:bg-[#FDDF23]/80 shadow-md hover:shadow-lg transition-all duration-200"
                      onClick={() => handleClaimReward({ id: 2, title: 'Americano' })}
                    >
                      Claim Reward (300 pts)
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
              {/* First Reward Item */}

              <Sheet>
                <SheetTrigger asChild>
                  <div className="relative cursor-pointer group">
                    <div className='bg-[#FDDF23] text-black text-center text-xs font-medium py-1 rounded-full -mt-2 z-10 w-fit px-2 border border-gray-300 absolute right-2'>
                      200 pts
                    </div>
                    <div className='w-full aspect-square border border-gray-300 rounded-md overflow-hidden group-hover:shadow-lg transition-all'>
                      <Image
                        src='/tori kara.jpg'
                        alt='Tori Kara'
                        className='object-cover w-full h-full group-hover:scale-105 transition-transform'
                        width={200}
                        height={200}
                      />
                    </div>
                    <p className="text-sm font-medium mt-2">Tori Kara</p>
                    <p className="text-xs text-gray-500">Free with any purchase</p>
                  </div>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[50vh] rounded-t-[28px] bg-white w-full">
                  <SheetHeader>
                    <SheetTitle>Free Indomie Tori Kara</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4 space-y-4 w-full">
                    <Image
                      src='/tori kara.jpg'
                      alt='tori kara'
                      width={100}
                      height={100}
                      className="rounded-lg mx-auto"
                    />
                    <p className="text-sm text-gray-600">Enjoy a free Indomie Tori Kara</p>
                    <div>
                      <h5 className="font-semibold mb-2">Terms and Conditions:</h5>
                      <ul className="text-sm text-gray-600 list-disc pl-4 space-y-1">
                        <li>Valid for one redemption per visit</li>
                        <li>Available for any size</li>
                        <li>Cannot be combined with other promotions</li>
                        <li>Valid until 31 December 2024</li>
                      </ul>
                    </div>
                    <Button
                      className="w-full bg-[#FDDF23] text-black hover:bg-[#FDDF23]/80 shadow-md hover:shadow-lg transition-all duration-200"
                      onClick={() => handleClaimReward({ id: 2, title: 'Americano' })}
                    >
                      Claim Reward (300 pts)
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Second Reward Item */}
              <Sheet>
                <SheetTrigger asChild>
                  <div className="relative cursor-pointer group">
                    <div className='bg-[#FDDF23] text-black text-center text-xs font-medium py-1 rounded-full -mt-2 z-10 w-fit px-2 border border-gray-300 absolute right-2'>
                      300 pts
                    </div>
                    <div className='w-full aspect-square border border-gray-300 rounded-md overflow-hidden group-hover:shadow-lg transition-all'>
                      <Image
                        src='/nescafe.jpg'
                        alt='Americano'
                        className='object-cover w-full h-full group-hover:scale-105 transition-transform'
                        width={200}
                        height={200}
                      />
                    </div>
                    <p className="text-sm font-medium mt-2">Americano</p>
                    <p className="text-xs text-gray-500">Any size</p>
                  </div>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[50vh] rounded-t-[28px] bg-white w-full">
                  <SheetHeader>
                    <SheetTitle>Free Americano</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4 space-y-4 w-full">
                    <Image
                      src='/nescafe.jpg'
                      alt='Americano'
                      width={100}
                      height={100}
                      className="rounded-lg mx-auto"
                    />
                    <p className="text-sm text-gray-600">Enjoy a free Americano of any size</p>
                    <div>
                      <h5 className="font-semibold mb-2">Terms and Conditions:</h5>
                      <ul className="text-sm text-gray-600 list-disc pl-4 space-y-1">
                        <li>Valid for one redemption per visit</li>
                        <li>Available for any size</li>
                        <li>Cannot be combined with other promotions</li>
                        <li>Valid until 31 December 2024</li>
                      </ul>
                    </div>
                    <Button
                      className="w-full bg-[#FDDF23] text-black hover:bg-[#FDDF23]/80 shadow-md hover:shadow-lg transition-all duration-200"
                      onClick={() => handleClaimReward({ id: 2, title: 'Americano' })}
                    >
                      Claim Reward (300 pts)
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>

              <Sheet>
                <SheetTrigger asChild>
                  <div className="relative cursor-pointer group">
                    <div className='bg-[#FDDF23] text-black text-center text-xs font-medium py-1 rounded-full -mt-2 z-10 w-fit px-2 border border-gray-300 absolute right-2'>
                      200 pts
                    </div>
                    <div className='w-full aspect-square border border-gray-300 rounded-md overflow-hidden group-hover:shadow-lg transition-all'>
                      <Image
                        src='/tori kara.jpg'
                        alt='Tori Kara'
                        className='object-cover w-full h-full group-hover:scale-105 transition-transform'
                        width={200}
                        height={200}
                      />
                    </div>
                    <p className="text-sm font-medium mt-2">Tori Kara</p>
                    <p className="text-xs text-gray-500">Free with any purchase</p>
                  </div>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[50vh] rounded-t-[28px] bg-white w-full">
                  <SheetHeader>
                    <SheetTitle>Free Indomie Tori Kara</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4 space-y-4 w-full">
                    <Image
                      src='/tori kara.jpg'
                      alt='tori kara'
                      width={100}
                      height={100}
                      className="rounded-lg mx-auto"
                    />
                    <p className="text-sm text-gray-600">Enjoy a free Indomie Tori Kara</p>
                    <div>
                      <h5 className="font-semibold mb-2">Terms and Conditions:</h5>
                      <ul className="text-sm text-gray-600 list-disc pl-4 space-y-1">
                        <li>Valid for one redemption per visit</li>
                        <li>Available for any size</li>
                        <li>Cannot be combined with other promotions</li>
                        <li>Valid until 31 December 2024</li>
                      </ul>
                    </div>
                    <Button
                      className="w-full bg-[#FDDF23] text-black hover:bg-[#FDDF23]/80 shadow-md hover:shadow-lg transition-all duration-200"
                      onClick={() => handleClaimReward({ id: 2, title: 'Americano' })}
                    >
                      Claim Reward (300 pts)
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Second Reward Item */}
              <Sheet>
                <SheetTrigger asChild>
                  <div className="relative cursor-pointer group">
                    <div className='bg-[#FDDF23] text-black text-center text-xs font-medium py-1 rounded-full -mt-2 z-10 w-fit px-2 border border-gray-300 absolute right-2'>
                      300 pts
                    </div>
                    <div className='w-full aspect-square border border-gray-300 rounded-md overflow-hidden group-hover:shadow-lg transition-all'>
                      <Image
                        src='/nescafe.jpg'
                        alt='Americano'
                        className='object-cover w-full h-full group-hover:scale-105 transition-transform'
                        width={200}
                        height={200}
                      />
                    </div>
                    <p className="text-sm font-medium mt-2">Americano</p>
                    <p className="text-xs text-gray-500">Any size</p>
                  </div>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[50vh] rounded-t-[28px] bg-white w-full">
                  <SheetHeader>
                    <SheetTitle>Free Americano</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4 space-y-4 w-full">
                    <Image
                      src='/nescafe.jpg'
                      alt='Americano'
                      width={100}
                      height={100}
                      className="rounded-lg mx-auto"
                    />
                    <p className="text-sm text-gray-600">Enjoy a free Americano of any size</p>
                    <div>
                      <h5 className="font-semibold mb-2">Terms and Conditions:</h5>
                      <ul className="text-sm text-gray-600 list-disc pl-4 space-y-1">
                        <li>Valid for one redemption per visit</li>
                        <li>Available for any size</li>
                        <li>Cannot be combined with other promotions</li>
                        <li>Valid until 31 December 2024</li>
                      </ul>
                    </div>
                    <Button
                      className="w-full bg-[#FDDF23] text-black hover:bg-[#FDDF23]/80 shadow-md hover:shadow-lg transition-all duration-200"
                      onClick={() => handleClaimReward({ id: 2, title: 'Americano' })}
                    >
                      Claim Reward (300 pts)
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </CardContent>
        </Card>



        {/* Success Dialog */}
        <Dialog open={showSuccessPopup} onOpenChange={setShowSuccessPopup}>
          <DialogContent className="sm:max-w-[425px] rounded-[28px] p-6">
            <div className="flex flex-col items-center justify-center">
              <icons.CheckCircle className="w-16 h-16 text-[#FDDF23] mb-6" />
              <h2 className="text-[1.5rem] font-medium text-center mb-2">Success!</h2>
              <p className="text-center text-[#666666] text-[0.875rem] mb-6">
                You have successfully claimed your reward.
              </p>
              <Button
                className="bg-[#FDDF23] text-black hover:bg-[#FDDF23]/90 active:bg-[#FDDF23]/80 
                         shadow-sm hover:shadow-md transition-all duration-200 
                         rounded-md h-12 text-[0.875rem] font-medium w-full"
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

