export function setupDemoUser() {
  const demoUser = {
    id: "demo-user-123",
    name: "Demo User",
    email: "demo@example.com",
    password: "password123",
    verificationKey: "",
    profileComplete: true,
    profile: {
      gpa: "3.8",
      courses: "AP Calculus BC, AP Chemistry, AP English Literature, IB History HL, Honors Physics",
      intendedMajor: "Computer Science, Mathematics",
      householdIncome: "100k-150k",
      extracurriculars:
        "Student Government President, Varsity Soccer Captain, Math Tutoring, Volunteer at Local Hospital, Debate Team",
      financialAid: "yes",
    },
  }

  // Only set up demo user if no user exists
  const existingUser = localStorage.getItem("user")
  if (!existingUser) {
    localStorage.setItem("user", JSON.stringify(demoUser))
  }
}

export function clearDemoData() {
  localStorage.removeItem("user")
  localStorage.removeItem("isAuthenticated")
}
