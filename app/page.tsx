"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Target, TrendingUp, Search } from "lucide-react"
import { useEffect } from "react"
import { setupDemoUser } from "@/lib/demo-setup"

export default function HomePage() {
  useEffect(() => {
    // Set up demo user for testing
    setupDemoUser()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Find Your Perfect College Match</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get personalized college recommendations powered by AI. Discover your safety, match, and reach schools based
            on your academic profile and preferences.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="px-8 py-3">
                Get Started
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="px-8 py-3 bg-transparent">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center">
            <CardHeader>
              <Target className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle className="text-green-600">Safety Schools</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Colleges where you have a high chance of acceptance based on your profile
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <GraduationCap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-blue-600">Match Schools</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Colleges that align well with your academic credentials and goals</CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <TrendingUp className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <CardTitle className="text-orange-600">Reach Schools</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Ambitious choices that could be great opportunities to pursue</CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Search className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle className="text-purple-600">Search & Filter</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Find any college with advanced search and filtering options</CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div>
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
              <p className="text-gray-600">Enter your GPA, courses, intended major, and other relevant information</p>
            </div>
            <div>
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get AI Recommendations</h3>
              <p className="text-gray-600">
                Our AI analyzes your profile against 200+ colleges to find your best matches
              </p>
            </div>
            <div>
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Explore Your Options</h3>
              <p className="text-gray-600">
                View personalized acceptance probabilities and detailed college information
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
