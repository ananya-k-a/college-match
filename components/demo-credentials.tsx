import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Key } from "lucide-react"

export function DemoCredentials() {
  return (
    <Card className="mt-4 border-blue-200 bg-blue-50">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center text-blue-700">
          <Key className="h-4 w-4 mr-2" />
          Demo Credentials
        </CardTitle>
        <CardDescription className="text-xs text-blue-600">
          Use these credentials to test the login system
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-blue-600">Email:</span>
            <Badge variant="secondary" className="font-mono text-xs">
              demo@example.com
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-blue-600">Password:</span>
            <Badge variant="secondary" className="font-mono text-xs">
              password123
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
