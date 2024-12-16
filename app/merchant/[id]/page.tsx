'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ArrowLeft, Clock, icons } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { PointsBadge } from '@/app/components/PointsBadge'
import { GradientButton } from '@/app/components/GradientButton'

// Simplified merchant data
const merchantData = {
  id: 1,
  name: 'Sipn\'Sup',
  pointsClaimed: 750,
  operationalHours: '07:00 - 22:00',
  description: 'Restoran self-service dengan makanan instan khas korea dan view kota.',
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

interface Reward {
  id: number;
  title: string;
  description: string;
  points: number;
  image: string;
  shortDescription: string;
  termsAndConditions: string[];
  validUntil: string;
}

const rewardsData: Reward[] = [
  {
    id: 1,
    title: "Free Indomie Tori Kara",
    description: "Enjoy a free Indomie Tori Kara",
    points: 200,
    image: "/tori kara.jpg",
    shortDescription: "Free with any purchase",
    termsAndConditions: [
      "Valid for one redemption per visit",
      "Available for any size",
      "Cannot be combined with other promotions",
      "Valid until 31 December 2024"
    ],
    validUntil: "31 December 2024"
  },
  {
    id: 2,
    title: "Free Americano",
    description: "Enjoy a free Americano of any size",
    points: 300,
    image: "/nescafe.jpg",
    shortDescription: "Any size",
    termsAndConditions: [
      "Valid for one redemption per visit",
      "Available for any size",
      "Cannot be combined with other promotions",
      "Valid until 31 December 2024"
    ],
    validUntil: "31 December 2024"
  },
  {
    id: 3,
    title: "Indomie Tori Miso",
    description: "Enjoy a delicious bowl of Indomie Tori Miso ramen",
    points: 300,
    image: "https://images.tokopedia.net/img/cache/700/VqbcmM/2024/8/22/ecbecae5-20a5-41dc-b5ca-a072b9d6b519.png.webp?ect=4g",
    shortDescription: "Japanese-inspired instant noodles",
    termsAndConditions: [
      "Valid for one redemption per visit",
      "Available for any size",
      "Cannot be combined with other promotions",
      "Valid until 31 December 2024"
    ],
    validUntil: "31 December 2024"
  },
  {
    id: 4,
    title: "Korean Boba Milk Tea",
    description: "Refreshing boba milk tea with brown sugar pearls",
    points: 250,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFBG9VEgwSSdvGw9PUTz6U931V0OZnvwFP0Q&s",
    shortDescription: "Fresh daily boba pearls",
    termsAndConditions: [
      "Valid for one redemption per visit",
      "Standard size only",
      "Cannot be combined with other promotions",
      "Valid until 31 December 2024"
    ],
    validUntil: "31 December 2024"
  },
  {
    id: 5,
    title: "Kimchi Fried Rice",
    description: "Authentic Korean kimchi fried rice with egg",
    points: 400,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFeGJ039r3oOnChaW3Lgm1gROlon1PH0Ib8w&s",
    shortDescription: "Spicy and savory",
    termsAndConditions: [
      "Valid for one redemption per visit",
      "Regular portion size",
      "Cannot be combined with other promotions",
      "Valid until 31 December 2024"
    ],
    validUntil: "31 December 2024"
  },
  {
    id: 6,
    title: "Matcha Green Tea Latte",
    description: "Premium Japanese matcha green tea latte",
    points: 350,
    image: "https://www.eakindomitrasastari.com/wp-content/uploads/2018/09/Slide70.jpg",
    shortDescription: "Made with ceremonial grade matcha",
    termsAndConditions: [
      "Valid for one redemption per visit",
      "Hot or iced available",
      "Cannot be combined with other promotions",
      "Valid until 31 December 2024"
    ],
    validUntil: "31 December 2024"
  },
  {
    id: 7,
    title: "Matcha Green Tea Latte",
    description: "Premium Japanese matcha green tea latte",
    points: 350,
    image: "https://www.eakindomitrasastari.com/wp-content/uploads/2018/09/Slide70.jpg",
    shortDescription: "Made with ceremonial grade matcha",
    termsAndConditions: [
      "Valid for one redemption per visit",
      "Hot or iced available",
      "Cannot be combined with other promotions",
      "Valid until 31 December 2024"
    ],
    validUntil: "31 December 2024"
  }
];

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

  const handleClaimReward = (reward: Reward) => {
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
        <div className="relative h-16 bg-white shadow-lg">
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
          <div className="relative flex items-center px-4 h-full shadow-lg">
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
              <PointsBadge
                points={merchantData.pointsClaimed}
                className="shadow-md"
                size="sm"
              />
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

      <main className="px-4 -mt-[40vh] relative z-10 ">

        <div className='flex flex-row items-center gap-4 my-4 w-fullp-3 rounded-[28px]  '>
          <div className="relative w-20 h-20 my-auto flex-shrink-0 border-width-2 rounded-[12px]">
            <Image
              src={merchantData.image}
              alt={`${merchantData.name} Logo`}
              fill
              className="object-cover rounded-[12px] shadow-lg"
            />
            <PointsBadge
              points={merchantData.pointsClaimed}
              className="absolute -top-2 -left-2 shadow-md"
              size="sm"
            />
          </div>
          <div className='flex flex-col gap-1'>
            <div className='flex flex-row items-center justify-between gap-2'>
              <p className='text-2xl font-bold text-black rounded-lg px-2 py-1'>{merchantData.name}</p>
            </div>

            <p className='text-sm text-black rounded-lg px-2 py-1 font-medium w-fit'>{merchantData.description}</p>
            <div className="flex items-center text-sm font-medium text-black rounded-lg px-2 py-1 w-fit0">
              <Clock className="w-4 h-4 mr-2" />
              {merchantData.operationalHours}
            </div>

          </div>
        </div>
        {/* Points and Hours Card */}
        <Card className="border border-gray-300 bg-white rounded-[28px] shadow-lg mb-8 mt-16">
          <CardContent className="p-8">
            <div className='text-md font-bold border border-gray-300 border-width-16 text-center rounded-full px-4 py-1 w-fit mx-auto -mt-12 bg-white shadow-lg'>Kuy, Tukerin poin-mu disini!</div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 mt-8">
              {rewardsData.map((reward) => (
                <Sheet key={reward.id}>
                  <SheetTrigger asChild>
                    <div className="relative cursor-pointer group rounded-md">
                      <PointsBadge
                        points={reward.points}
                        className="absolute right-2 -mt-4 z-10 border border-gray-300"
                        size="sm"
                      />
                      <div className='w-full aspect-square rounded-md overflow-hidden group-hover:shadow-lg transition-all'>
                        <Image
                          src={reward.image}
                          alt={reward.title}
                          className='object-cover w-full h-full group-hover:scale-105 transition-transform'
                          width={200}
                          height={200}
                        />
                      </div>
                      <p className="text-sm font-medium mt-2">{reward.title}</p>
                      <p className="text-xs text-gray-500">{reward.shortDescription}</p>
                    </div>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-[50vh] rounded-t-[28px] bg-white w-full">
                    <SheetHeader>
                      <SheetTitle>{reward.title}</SheetTitle>
                    </SheetHeader>
                    <div className="mt-4 space-y-4 w-full">
                      <Image
                        src={reward.image}
                        alt={reward.title}
                        width={100}
                        height={100}
                        className="rounded-lg mx-auto"
                      />
                      <p className="text-sm text-gray-600">{reward.description}</p>
                      <div>
                        <h5 className="font-semibold mb-2">Terms and Conditions:</h5>
                        <ul className="text-sm text-gray-600 list-disc pl-4 space-y-1">
                          {reward.termsAndConditions.map((term, index) => (
                            <li key={index}>{term}</li>
                          ))}
                        </ul>
                      </div>
                      <GradientButton
                        points={reward.points}
                        className="w-full shadow-md border border-gray-300"
                        onClick={() => handleClaimReward(reward)}
                      >
                        Tukerin {reward.points} poin!
                      </GradientButton>
                    </div>
                  </SheetContent>
                </Sheet>
              ))}
            </div>
          </CardContent>
        </Card>



        {/* Success Dialog */}
        <Dialog open={showSuccessPopup} onOpenChange={setShowSuccessPopup}>
          <DialogContent className="sm:max-w-[425px] rounded-[28px] p-6">
            <div className="flex flex-col items-center justify-center">
              {/* <icons.CheckCircle className="w-16 h-16 text-[#FDDF23] mb-6" /> */}

              <p className="text-center text-[#666666] text-[0.875rem]">
                Berhasil Tukerin poin-mu!, kasih kode QR ini ke kasir ya!
              </p>
              <div className='w-full aspect-square rounded-md overflow-hidden group-hover:shadow-lg transition-all'>
                <Image
                  src={'/qr.png'}
                  alt={'ok'}
                  className='object-cover w-full h-full group-hover:scale-105 transition-transform'
                  width={150}
                  height={150}
                />
              </div>
              <p className='text-xs text-center text-[#666666] my-2'>
                Atau, berikan kode ini ke kasir
              </p>
              <p className="text-center text-[#1A1A1A] text-xl mb-6 bg-gray-200 rounded-md px-4 py-2 font-mono shadow-lg backdrop-blur-md border border-gray-300 ">
                SNSP-BZCA-ABEF
              </p>
              <div className='flex flex-col gap-2 w-full'>
                <Button
                  className="bg-[#FDDF23] text-black hover:bg-[#FDDF23]/90 active:bg-[#FDDF23]/80 
                         shadow-sm hover:shadow-md transition-all duration-200 
                         rounded-md h-12 text-[0.875rem] font-medium w-full shadow-md"
                  onClick={() => setShowSuccessPopup(false)}
                >
                  Selesai!
                </Button>
                <Button
                  className='bg-gray-100 text-black hover:bg-gray-200 active:bg-gray-300 shadow-sm hover:shadow-md transition-all duration-200 rounded-md h-12 text-[0.875rem] font-medium w-full shadow-md'
                  onClick={() => window.location.href = '/reward-history'}
                >
                  Pergi ke halaman histori poin
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}

