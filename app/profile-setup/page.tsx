"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Loader2 } from "lucide-react"

export default function ProfileSetupPage() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    gpa: "",
    courses: "",
    intendedMajor: "",
    householdIncome: "",
    extracurriculars: "",
    financialAid: "",
  })
  const router = useRouter()

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      const existingUser = localStorage.getItem("user")
      if (existingUser) {
        const userData = JSON.parse(existingUser)
        userData.profile = formData
        userData.profileComplete = true
        localStorage.setItem("user", JSON.stringify(userData))
      }

      setLoading(false)
      router.push("/dashboard")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="container mx-auto max-w-2xl py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Complete Your Profile</CardTitle>
            <CardDescription className="text-center">
              Help us provide personalized college recommendations by sharing your academic information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="gpa">GPA (on 4.0 scale)</Label>
                <Input
                  id="gpa"
                  type="number"
                  step="0.01"
                  min="0"
                  max="4.0"
                  placeholder="3.75"
                  value={formData.gpa}
                  onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="courses">Courses Taken (AP, IB, Honors, etc.)</Label>
                <Textarea
                  id="courses"
                  placeholder="AP Calculus BC, AP Chemistry, IB English HL, etc."
                  value={formData.courses}
                  onChange={(e) => setFormData({ ...formData, courses: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="intendedMajor">Intended Major(s)</Label>
                <Input
                  id="intendedMajor"
                  placeholder="Computer Science, Biology, Business Administration"
                  value={formData.intendedMajor}
                  onChange={(e) => setFormData({ ...formData, intendedMajor: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="householdIncome">Household Income Range</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, householdIncome: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select income range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-30k">Under $30,000</SelectItem>
                    <SelectItem value="30k-60k">$30,000 - $60,000</SelectItem>
                    <SelectItem value="60k-100k">$60,000 - $100,000</SelectItem>
                    <SelectItem value="100k-150k">$100,000 - $150,000</SelectItem>
                    <SelectItem value="150k-200k">$150,000 - $200,000</SelectItem>
                    <SelectItem value="over-200k">Over $200,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="extracurriculars">Extracurricular Activities</Label>
                <Textarea
                  id="extracurriculars"
                  placeholder="Student Government, Varsity Soccer, Debate Team, Volunteer Work, etc."
                  value={formData.extracurriculars}
                  onChange={(e) => setFormData({ ...formData, extracurriculars: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-3">
                <Label>Do you need financial aid?</Label>
                <RadioGroup
                  value={formData.financialAid}
                  onValueChange={(value) => setFormData({ ...formData, financialAid: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="aid-yes" />
                    <Label htmlFor="aid-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="aid-no" />
                    <Label htmlFor="aid-no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing Your Profile...
                  </>
                ) : (
                  "Get My Recommendations"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
