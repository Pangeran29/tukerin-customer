'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, Clock, icons } from 'lucide-react'
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

export default function ClaimPointsPage() {
  const router = useRouter()
  const [selectedReward, setSelectedReward] = useState(null)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 140) // Adjust this value based on when you want the header to appear
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
            </button>
          </div>
        </div>
      </div>

      <main className="px-4 -mt-[70vh] relative z-10 ">


        <Card className="border border-gray-300 bg-gray-100 rounded-[28px] shadow-lg mb-8 mt-16">

          <CardContent className="p-8">
            <div className='text-md font-bold border border-gray-300 border-width-16 text-center rounded-full px-4 py-1 w-fit mx-auto -mt-12 bg-white shadow-lg'>Berhasil claim poin!</div>
            <div className='w-full flex justify-center ms-center p-4 items-center h-fit gap-4 mt-6'>
              <div className="relative w-20 h-20 my-auto flex-shrink-0 border-width-2 rounded-[12px] ">
                <Image
                  src={merchantData.image}
                  alt={`${merchantData.name} Logo`}
                  fill
                  className="object-cover rounded-[12px] shadow-lg"
                />
                <div className='w-full flex justify-center'>
                  <PointsBadge
                    points={190}
                    className="absolute -top-2 shadow-md"
                    size="sm"
                  />
                </div>
              </div>
              <div className='flex flex-col justify-center items-center 0'>
                <ArrowRight className='w-7 h-7 text-black my-auto' />
                <PointsBadge
                  prefix='+'
                  points={50}
                  size="sm"
                />
              </div>
              <div className="relative w-20 h-20 my-auto flex-shrink-0 border-width-2 rounded-[12px] ">
                <Image
                  src={merchantData.image}
                  alt={`${merchantData.name} Logo`}
                  fill
                  className="object-cover rounded-[12px] shadow-lg"
                />
                <div className='w-full flex justify-center'>
                  <PointsBadge
                    points={240}
                    className="absolute -top-2 shadow-md"
                    size="sm"
                  />
                </div>
              </div>
            </div>
            <GradientButton
              points={240}
              className="w-full shadow-md border border-gray-300 mt-6"
              onClick={() => { window.location.href = '/merchant/1' }}
            >
              Sip, nanti kita Tukerin!
            </GradientButton>
            <p className='text-sm text-gray-500 text-center p-4'> Jangan lupa baca <a className='text-blue-500'> syarat & ketentuan</a> kami yaa</p>
          </CardContent>
        </Card>

      </main>
    </div>
  )
}

