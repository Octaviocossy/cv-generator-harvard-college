import type { CVData } from "@/types/cv"

interface CVPreviewProps {
  data: CVData
  language?: "en" | "es"
}

const translations = {
  en: {
    professionalSummary: "PROFESSIONAL SUMMARY",
    education: "EDUCATION",
    experience: "EXPERIENCE",
    projects: "LAST PROJECTS",
    skills: "SKILLS",
    languages: "LANGUAGES",
    technicalSkills: "Technical Skills",
    softSkills: "Soft Skills",
  },
  es: {
    professionalSummary: "RESUMEN PROFESIONAL",
    education: "EDUCACIÓN",
    experience: "EXPERIENCIA",
    projects: "ULTIMOS PROYECTOS",
    skills: "HABILIDADES",
    languages: "IDIOMAS",
    technicalSkills: "Habilidades Técnicas",
    softSkills: "Habilidades Blandas",
  },
}

export function CVPreview({ data, language = "en" }: CVPreviewProps) {
  const t = translations[language]

  return (
    <div className="bg-white text-black p-5 shadow-lg max-w-2xl mx-auto font-sans">
      {/* Header */}
      <div className="text-center mb-5 border-b border-gray-300 pb-4">
        <h1 className="text-2xl font-bold mb-2">{data.personal.name}</h1>
        <p className="text-base text-gray-700 mb-3 font-bold">{data.personal.role}</p>
        <div className="text-sm text-gray-600 space-y-1">
          <p>{data.personal.location}</p>
          <p>
            {data.personal.email} • {data.personal.phone}
          </p>
          <div className="flex justify-center gap-4">
            {data.personal.links.linkedin && <span>LinkedIn: {data.personal.links.linkedin}</span>}
            {data.personal.links.github && <span>GitHub: {data.personal.links.github}</span>}
            {data.personal.links.portfolio && <span>Portfolio: {data.personal.links.portfolio}</span>}
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      {data.summary && (
        <div className="mb-4">
          <h2 className="text-base font-bold mb-2 border-b border-gray-200 pb-1">{t.professionalSummary}</h2>
          <p className="text-sm leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Education */}
      <div className="mb-4">
        <h2 className="text-base font-bold mb-2 border-b border-gray-200 pb-1">{t.education}</h2>
        {data.education.map((edu, index) => (
          <div key={index} className="mb-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-sm">{edu.institution}</h3>
                <p className="text-sm">{edu.degree}</p>
                {edu.details && <p className="text-sm text-gray-600">{edu.details}</p>}
              </div>
              <span className="text-sm text-gray-600">{edu.period}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Experience */}
      <div className="mb-4">
        <h2 className="text-base font-bold mb-2 border-b border-gray-200 pb-1">{t.experience}</h2>
        {data.experience.map((exp, index) => (
          <div key={index} className="mb-3">
            <div className="flex justify-between items-start mb-1">
              <div>
                <h3 className="font-semibold text-sm">{exp.company}</h3>
                <p className="text-sm font-medium">{exp.role}</p>
                {exp.role_description && (
                  <p className="text-xs">{exp.role_description}</p>
                )}
              </div>
              <span className="text-sm text-gray-600">{exp.period}</span>
            </div>
            <div className="text-sm leading-relaxed whitespace-pre-line">{exp.description}</div>
          </div>
        ))}
      </div>

      {/* Projects */}
      <div className="mb-4">
        <h2 className="text-base font-bold mb-2 border-b border-gray-200 pb-1">{t.projects}</h2>
        {data.projects.map((project, index) => (
          <div key={index} className="mb-2">
            <h3 className="font-semibold text-sm">{project.title}</h3>
            <p className="text-sm leading-relaxed">{project.description}</p>
            {project.technologies && project.technologies.length > 0 && (
              <p className="text-xs text-gray-600 mt-1">
                <span className="font-medium">Technologies:</span> {project.technologies.join(", ")}
              </p>
            )}
            {project.link && <p className="text-sm text-gray-600">Link: {project.link}</p>}
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="mb-4">
        <h2 className="text-base font-bold mb-2 border-b border-gray-200 pb-1">{t.skills}</h2>
        <div className="grid grid-cols-1 gap-2">
          <div>
            <h3 className="font-semibold text-sm mb-1">{t.technicalSkills}</h3>
            <p className="text-sm">{data.skills.technical.join(", ")}</p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-1">{t.softSkills}</h3>
            <p className="text-sm">{data.skills.soft.join(", ")}</p>
          </div>
        </div>
      </div>

      {/* Languages */}
      <div className="mb-3">
        <h2 className="text-base font-bold mb-2 border-b border-gray-200 pb-1">{t.languages}</h2>
        <div className="grid grid-cols-2 gap-2">
          {data.languages.map((lang, index) => (
            <div key={index} className="text-sm">
              <span className="font-medium">{lang.name}</span>: {lang.level}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
