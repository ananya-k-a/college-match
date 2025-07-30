import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MapPin, Users, GraduationCap } from "lucide-react"
import { calculateAcceptanceProbability } from "@/lib/ai-recommendations"

interface CollegeCardProps {
  college: {
    id: number
    name: string
    location: string
    acceptanceRate: number
    type: string
    avgGPA: number
    avgSAT?: number
  }
  userProfile: any
}

export function CollegeCard({ college, userProfile }: CollegeCardProps) {
  const acceptanceProbability = calculateAcceptanceProbability(college, userProfile)

  const getProbabilityColor = (probability: number) => {
    if (probability >= 70) return "text-green-600"
    if (probability >= 40) return "text-blue-600"
    return "text-orange-600"
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "ivy":
        return "bg-purple-100 text-purple-800"
      case "public":
        return "bg-blue-100 text-blue-800"
      case "private":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg leading-tight">{college.name}</CardTitle>
          <Badge className={getTypeColor(college.type)}>{college.type === "ivy" ? "Ivy League" : college.type}</Badge>
        </div>
        <CardDescription className="flex items-center text-sm">
          <MapPin className="h-3 w-3 mr-1" />
          {college.location}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            Acceptance Rate
          </span>
          <span className="font-semibold">{college.acceptanceRate}%</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center">
              <GraduationCap className="h-4 w-4 mr-1" />
              Your Chance
            </span>
            <span className={`font-bold ${getProbabilityColor(acceptanceProbability)}`}>{acceptanceProbability}%</span>
          </div>
          <Progress value={acceptanceProbability} className="h-2" />
        </div>

        <div className="text-xs text-gray-500 space-y-1">
          <div>Avg GPA: {college.avgGPA}</div>
          {college.avgSAT && <div>Avg SAT: {college.avgSAT}</div>}
        </div>
      </CardContent>
    </Card>
  )
}
