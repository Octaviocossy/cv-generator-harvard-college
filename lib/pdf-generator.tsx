import type { CVData } from "@/types/cv"

export async function generatePDF(data: CVData, language: "en" | "es" = "en") {
  // Create a new window with the CV content for printing
  const printWindow = window.open("", "_blank")

  if (!printWindow) {
    throw new Error("Unable to open print window. Please check your popup blocker settings.")
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
      technicalSkills: "Technical Skills",
      softSkills: "Soft Skills",
    },
  }

  const t = translations[language]

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${data.personal.name} - CV</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Times New Roman', serif;
            line-height: 1.3;
            color: #000;
            background: #fff;
            padding: 25px;
            max-width: 800px;
            margin: 0 auto;
          }
          
          .header {
            text-align: center;
            margin-bottom: 18px;
            border-bottom: 2px solid #333;
            padding-bottom: 12px;
          }
          
          .header h1 {
            font-size: 26px;
            font-weight: bold;
            margin-bottom: 6px;
          }
          
          .header .role {
            font-size: 16px;
            color: #333;
            margin-bottom: 8px;
            font-weight: bold;
          }
          
          .header .contact {
            font-size: 11px;
            color: #666;
            line-height: 1.4;
          }
          
          .section {
            margin-bottom: 15px;
          }
          
          .section-title {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 8px;
            border-bottom: 1px solid #ccc;
            padding-bottom: 3px;
            text-transform: uppercase;
          }
          
          .section-content {
            font-size: 11px;
            line-height: 1.4;
          }
          
          .entry {
            margin-bottom: 10px;
          }
          
          .entry-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 4px;
          }
          
          .entry-title {
            font-weight: bold;
            font-size: 11px;
          }
          
          .entry-subtitle {
            font-size: 11px;
            font-weight: 600;
          }
          
          .entry-period {
            font-size: 10px;
            color: #666;
            white-space: nowrap;
          }
          
          .entry-description {
            font-size: 11px;
            line-height: 1.4;
            white-space: pre-line;
          }
          
          .skills-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 8px;
          }
          
          .skill-category {
            font-weight: bold;
            font-size: 11px;
            margin-bottom: 3px;
          }
          
          .languages-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 6px;
          }
          
          @media print {
            body {
              padding: 18px;
              font-size: 10px;
            }
            
            .section {
              break-inside: avoid;
              margin-bottom: 12px;
            }
            
            .entry {
              margin-bottom: 8px;
            }
            
            .header {
              margin-bottom: 15px;
              padding-bottom: 10px;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${data.personal.name}</h1>
          <div class="role">${data.personal.role}</div>
          <div class="contact">
            <div>${data.personal.location}</div>
            <div>${data.personal.email} • ${data.personal.phone}</div>
            <div>
              ${data.personal.links.linkedin ? `LinkedIn: ${data.personal.links.linkedin}` : ""}
              ${data.personal.links.linkedin && data.personal.links.github ? " • " : ""}
              ${data.personal.links.github ? `GitHub: ${data.personal.links.github}` : ""}
              ${(data.personal.links.linkedin || data.personal.links.github) && data.personal.links.portfolio ? " • " : ""}
              ${data.personal.links.portfolio ? `Portfolio: ${data.personal.links.portfolio}` : ""}
            </div>
          </div>
        </div>

        <div class="section">
          <h2 class="section-title">${t.professionalSummary}</h2>
          <div class="section-content">${data.summary}</div>
        </div>

        <div class="section">
          <h2 class="section-title">${t.education}</h2>
          <div class="section-content">
            ${data.education
              .map(
                (edu) => `
              <div class="entry">
                <div class="entry-header">
                  <div>
                    <div class="entry-title">${edu.institution}</div>
                    <div class="entry-subtitle">${edu.degree}</div>
                    ${edu.details ? `<div style="font-size: 10px; color: #666;">${edu.details}</div>` : ""}
                  </div>
                  <div class="entry-period">${edu.period}</div>
                </div>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>

        <div class="section">
          <h2 class="section-title">${t.experience}</h2>
          <div class="section-content">
            ${data.experience
              .map(
                (exp) => `
              <div class="entry">
                <div class="entry-header">
                  <div>
                    <div class="entry-title">${exp.company}</div>
                    <div class="entry-subtitle">${exp.role}</div>
                  </div>
                  <div class="entry-period">${exp.period}</div>
                </div>
                <div class="entry-description">${exp.description}</div>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>

        <div class="section">
          <h2 class="section-title">${t.projects}</h2>
          <div class="section-content">
            ${data.projects
              .map(
                (project) => `
              <div class="entry">
                <div class="entry-title">${project.title}</div>
                <div class="entry-description">${project.description}</div>
                ${project.link ? `<div style="font-size: 10px; color: #666;">Link: ${project.link}</div>` : ""}
              </div>
            `,
              )
              .join("")}
          </div>
        </div>

        <div class="section">
          <h2 class="section-title">${t.skills}</h2>
          <div class="section-content">
            <div class="skills-grid">
              <div>
                <div class="skill-category">${t.technicalSkills}</div>
                <div>${data.skills.technical.join(", ")}</div>
              </div>
              <div>
                <div class="skill-category">${t.softSkills}</div>
                <div>${data.skills.soft.join(", ")}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="section">
          <h2 class="section-title">${t.languages}</h2>
          <div class="section-content">
            <div class="languages-grid">
              ${data.languages
                .map(
                  (lang) => `
                <div><strong>${lang.name}</strong>: ${lang.level}</div>
              `,
                )
                .join("")}
            </div>
          </div>
        </div>
      </body>
    </html>
  `

  printWindow.document.write(htmlContent)
  printWindow.document.close()

  // Wait for content to load, then trigger print dialog
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.print()
    }, 250)
  }
}
