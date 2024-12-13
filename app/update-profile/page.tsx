'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

// Mock data for dropdowns
const provinces = ['Province A', 'Province B', 'Province C']
const regencies = ['Regency 1', 'Regency 2', 'Regency 3']
const districts = ['District X', 'District Y', 'District Z']
const villages = ['Village 1', 'Village 2', 'Village 3']

export default function UpdateProfilePage() {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [province, setProvince] = useState('')
  const [regency, setRegency] = useState('')
  const [district, setDistrict] = useState('')
  const [village, setVillage] = useState('')
  const [detailAddress, setDetailAddress] = useState('')

  const handleSendVerification = () => {
    // TODO: Implement email verification logic
    alert('Verification email sent to ' + email)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement profile update logic
    console.log('Profile updated', { email, phone, province, regency, district, village, detailAddress })
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="flex items-center px-4 h-16">
          <Link href="/" className="mr-4">
            <ArrowLeft className="w-6 h-6 text-black" />
          </Link>
          <h1 className="text-xl font-semibold text-black">Update Profile</h1>
        </div>
      </header>

      <main className="pt-20 pb-6 px-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email">Email</Label>
            <div className="flex mt-1">
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow bg-white border-[#FDDF23]"
                required
              />
              <Button
                type="button"
                onClick={handleSendVerification}
                className="ml-2 bg-[#FDDF23] text-black hover:bg-[#FDDF23]/80"
              >
                Verify
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-white border-[#FDDF23]"
              required
            />
          </div>

          <div>
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

          <div>
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

          <div>
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

          <div>
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

          <div>
            <Label htmlFor="detailAddress">Detail Address</Label>
            <Textarea
              id="detailAddress"
              value={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value)}
              className="bg-white border-[#FDDF23]"
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full bg-[#FDDF23] text-black hover:bg-[#FDDF23]/80">
            Update Profile
          </Button>
        </form>
      </main>
    </div>
  )
}

