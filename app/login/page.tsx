"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Key } from "lucide-react"
import { DemoCredentials } from "@/components/demo-credentials"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [verificationKey, setVerificationKey] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      const existingUser = localStorage.getItem("user")

      if (!existingUser) {
        setError("No account found with this email. Please sign up first.")
        setLoading(false)
        return
      }

      const userData = JSON.parse(existingUser)

      // Check if email matches
      if (userData.email !== formData.email) {
        setError("Invalid email or password.")
        setLoading(false)
        return
      }

      // In a real app, you'd hash and compare passwords
      // For demo purposes, we'll store a simple password
      const storedPassword = userData.password || "password123" // Default for existing users

      if (formData.password !== storedPassword) {
        setError("Invalid email or password.")
        setLoading(false)
        return
      }

      // If we get here, credentials are valid
      const newVerificationKey = Math.random().toString(36).substring(2, 15)
      userData.verificationKey = newVerificationKey
      localStorage.setItem("user", JSON.stringify(userData))
      localStorage.setItem("isAuthenticated", "true")

      setVerificationKey(newVerificationKey)
      setLoading(false)

      // Redirect after showing verification key
      setTimeout(() => {
        if (userData.profileComplete) {
          router.push("/dashboard")
        } else {
          router.push("/profile-setup")
        }
      }, 3000)
    }, 1500)
  }

  if (verificationKey) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Key className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <CardTitle className="text-2xl font-bold text-green-600">Login Successful!</CardTitle>
            <CardDescription>Here is your verification key for this session</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <code className="text-lg font-mono font-bold text-blue-600">{verificationKey}</code>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Save this key for your records. You will be redirected shortly.
            </p>
            <div className="flex items-center justify-center">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              <span className="text-sm">Redirecting...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
          <CardDescription className="text-center">Sign in to access your college recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          <DemoCredentials />
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
