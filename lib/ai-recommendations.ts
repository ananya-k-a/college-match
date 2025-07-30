import { colleges } from "./colleges-data"

export function calculateAcceptanceProbability(college: any, userProfile: any): number {
  const userGPA = Number.parseFloat(userProfile.gpa)
  const collegeAvgGPA = college.avgGPA
  const collegeAcceptanceRate = college.acceptanceRate

  // Base probability starts with the college's acceptance rate
  let probability = collegeAcceptanceRate

  // Adjust based on GPA comparison
  const gpaDifference = userGPA - collegeAvgGPA

  if (gpaDifference > 0.3) {
    // User's GPA is significantly higher
    probability = Math.min(probability * 2.5, 95)
  } else if (gpaDifference > 0.1) {
    // User's GPA is moderately higher
    probability = Math.min(probability * 1.8, 90)
  } else if (gpaDifference > -0.1) {
    // User's GPA is close to average
    probability = Math.min(probability * 1.3, 85)
  } else if (gpaDifference > -0.3) {
    // User's GPA is moderately lower
    probability = probability * 0.7
  } else {
    // User's GPA is significantly lower
    probability = probability * 0.4
  }

  // Adjust for course rigor (AP, IB, Honors)
  const courses = userProfile.courses.toLowerCase()
  const rigorousCoursesCount = (courses.match(/ap |ib |honors/g) || []).length

  if (rigorousCoursesCount >= 8) {
    probability *= 1.4
  } else if (rigorousCoursesCount >= 5) {
    probability *= 1.2
  } else if (rigorousCoursesCount >= 3) {
    probability *= 1.1
  }

  // Adjust for extracurriculars
  const extracurriculars = userProfile.extracurriculars.toLowerCase()
  const activitiesCount = extracurriculars.split(",").length

  if (activitiesCount >= 5) {
    probability *= 1.3
  } else if (activitiesCount >= 3) {
    probability *= 1.15
  } else if (activitiesCount >= 1) {
    probability *= 1.05
  }

  // Adjust for financial aid (some colleges prefer need-based students)
  if (userProfile.financialAid === "yes" && college.type === "private") {
    probability *= 1.1
  }

  // Ensure probability is within reasonable bounds
  return Math.min(Math.max(Math.round(probability), 1), 95)
}

export function generateRecommendations(userProfile: any) {
  const recommendations = {
    safety: [] as any[],
    match: [] as any[],
    reach: [] as any[],
  }

  // Calculate probabilities for all colleges
  const collegesWithProbabilities = colleges.map((college) => ({
    ...college,
    probability: calculateAcceptanceProbability(college, userProfile),
  }))

  // Sort by probability (highest first)
  collegesWithProbabilities.sort((a, b) => b.probability - a.probability)

  // Categorize colleges
  collegesWithProbabilities.forEach((college) => {
    if (college.probability >= 70) {
      if (recommendations.safety.length < 15) {
        recommendations.safety.push(college)
      }
    } else if (college.probability >= 40) {
      if (recommendations.match.length < 15) {
        recommendations.match.push(college)
      }
    } else if (college.probability >= 10) {
      if (recommendations.reach.length < 15) {
        recommendations.reach.push(college)
      }
    }
  })

  // If any category is empty, fill with appropriate colleges
  if (recommendations.safety.length === 0) {
    recommendations.safety = collegesWithProbabilities.filter((c) => c.acceptanceRate > 60).slice(0, 10)
  }

  if (recommendations.match.length === 0) {
    recommendations.match = collegesWithProbabilities
      .filter((c) => c.acceptanceRate > 20 && c.acceptanceRate <= 60)
      .slice(0, 10)
  }

  if (recommendations.reach.length === 0) {
    recommendations.reach = collegesWithProbabilities.filter((c) => c.acceptanceRate <= 20).slice(0, 10)
  }

  return recommendations
}
