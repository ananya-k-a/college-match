"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, LogOut, User } from "lucide-react"
import { CollegeCard } from "@/components/college-card"
import { colleges } from "@/lib/colleges-data"
import { generateRecommendations } from "@/lib/ai-recommendations"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [recommendations, setRecommendations] = useState<any>({ safety: [], match: [], reach: [] })
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterAcceptanceRate, setFilterAcceptanceRate] = useState("all")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    const userData = localStorage.getItem("user")

    if (!isAuthenticated || !userData) {
      router.push("/login")
      return
    }

    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)

    if (parsedUser.profileComplete) {
      const recs = generateRecommendations(parsedUser.profile)
      setRecommendations(recs)
    }
  }, [router])

  const handleSearch = () => {
    let results = colleges.filter(
      (college) =>
        college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        college.location.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    if (filterType !== "all") {
      results = results.filter((college) => college.type === filterType)
    }

    if (filterAcceptanceRate !== "all") {
      const [min, max] = filterAcceptanceRate.split("-").map(Number)
      results = results.filter((college) => {
        const rate = college.acceptanceRate
        if (max) {
          return rate >= min && rate <= max
        } else {
          return rate >= min
        }
      })
    }

    setSearchResults(results)
  }

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("user")
    router.push("/")
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">College Finder</h1>
            <Badge variant="secondary" className="flex items-center space-x-1">
              <User className="h-3 w-3" />
              <span>{user.name}</span>
            </Badge>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Search Colleges</span>
            </CardTitle>
            <CardDescription>Search for any college and see your personalized acceptance probability</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by college name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <div className="flex gap-2">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="ivy">Ivy League</SelectItem>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterAcceptanceRate} onValueChange={setFilterAcceptanceRate}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Acceptance Rate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Rates</SelectItem>
                    <SelectItem value="0-10">0-10%</SelectItem>
                    <SelectItem value="10-25">10-25%</SelectItem>
                    <SelectItem value="25-50">25-50%</SelectItem>
                    <SelectItem value="50-100">50%+</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleSearch}>
                  <Filter className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Search Results ({searchResults.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((college) => (
                  <CollegeCard key={college.id} college={college} userProfile={user.profile} />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recommendations Tabs */}
        <Tabs defaultValue="safety" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="safety" className="text-green-600">
              Safety Schools ({recommendations.safety.length})
            </TabsTrigger>
            <TabsTrigger value="match" className="text-blue-600">
              Match Schools ({recommendations.match.length})
            </TabsTrigger>
            <TabsTrigger value="reach" className="text-orange-600">
              Reach Schools ({recommendations.reach.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="safety" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">Safety Schools</CardTitle>
                <CardDescription>
                  Colleges where you have a high probability of acceptance (70%+ chance)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendations.safety.map((college: any) => (
                    <CollegeCard key={college.id} college={college} userProfile={user.profile} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="match" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600">Match Schools</CardTitle>
                <CardDescription>Colleges that align well with your profile (40-70% chance)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendations.match.map((college: any) => (
                    <CollegeCard key={college.id} college={college} userProfile={user.profile} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reach" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-orange-600">Reach Schools</CardTitle>
                <CardDescription>Ambitious choices worth pursuing (10-40% chance)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendations.reach.map((college: any) => (
                    <CollegeCard key={college.id} college={college} userProfile={user.profile} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
