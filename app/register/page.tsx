'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

// Mock data for dropdowns
const provinces = ['Province A', 'Province B', 'Province C']
const regencies = ['Regency 1', 'Regency 2', 'Regency 3']
const districts = ['District X', 'District Y', 'District Z']
const villages = ['Village 1', 'Village 2', 'Village 3']

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [province, setProvince] = useState('')
  const [regency, setRegency] = useState('')
  const [district, setDistrict] = useState('')
  const [village, setVillage] = useState('')
  const [detailAddress, setDetailAddress] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !phone || !province || !regency || !district || !village || !detailAddress) {
      setError('Please fill in all fields.')
      return
    }

    // Here you would typically make an API call to register the user
    // For this example, we'll use a mock registration
    console.log('Registration data:', { email, phone, province, regency, district, village, detailAddress })
    // Simulating successful registration
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border-[#FDDF23]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-white border-[#FDDF23]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="province">Province</Label>
              <Select value={province} onValueChange={setProvince}>
                <SelectTrigger id="province" className="bg-white border-[#FDDF23]">
                  <SelectValue placeholder="Select province" />
                </SelectTrigger>
                <SelectContent>
                  {provinces.map((p) => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="regency">Regency</Label>
              <Select value={regency} onValueChange={setRegency}>
                <SelectTrigger id="regency" className="bg-white border-[#FDDF23]">
                  <SelectValue placeholder="Select regency" />
                </SelectTrigger>
                <SelectContent>
                  {regencies.map((r) => (
                    <SelectItem key={r} value={r}>{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="district">District</Label>
              <Select value={district} onValueChange={setDistrict}>
                <SelectTrigger id="district" className="bg-white border-[#FDDF23]">
                  <SelectValue placeholder="Select district" />
                </SelectTrigger>
                <SelectContent>
                  {districts.map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="village">Village</Label>
              <Select value={village} onValueChange={setVillage}>
                <SelectTrigger id="village" className="bg-white border-[#FDDF23]">
                  <SelectValue placeholder="Select village" />
                </SelectTrigger>
                <SelectContent>
                  {villages.map((v) => (
                    <SelectItem key={v} value={v}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="detailAddress">Detail Address</Label>
              <Textarea
                id="detailAddress"
                placeholder="Enter your detailed address"
                value={detailAddress}
                onChange={(e) => setDetailAddress(e.target.value)}
                className="bg-white border-[#FDDF23]"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full bg-[#FDDF23] text-black hover:bg-[#FDDF23]/80">
              Register
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-[#FDDF23] hover:underline">
              Login here
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

