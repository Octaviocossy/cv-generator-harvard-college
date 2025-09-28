export interface CVData {
  personal: {
    name: string
    role: string
    location: string
    email: string
    phone: string
    links: {
      linkedin?: string
      github?: string
      portfolio?: string
    }
  }
  summary?: string
  education: Array<{
    institution: string
    degree: string
    period: string
    details?: string
  }>
  experience: Array<{
    company: string
    role: string
    role_description?: string
    period: string
    description: string
  }>
  projects: Array<{
    title: string
    description: string
    technologies?: string[]
    link?: string
  }>
  skills: {
    technical: string[]
    soft: string[]
  }
  languages: Array<{
    name: string
    level: string
  }>
}
