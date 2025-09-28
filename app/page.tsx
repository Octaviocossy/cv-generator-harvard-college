"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, FileText, AlertCircle, Globe } from "lucide-react";
import { CVPreview } from "@/components/cv-preview";
import { generatePDF } from "@/lib/pdf-generator";

const sampleData = {
  personal: {
    name: "Octavio Cossy Torquati",
    role: "Ssr. Fullstack Developer",
    location: "San Nicolas de los Arroyos, Buenos Aires",
    email: "octaviocossytorquati@gmail.com",
    phone: "+54 9 336 440-7974",
    links: {
      portfolio: "https://ovct.dev",
      linkedin: "https://linkedin.com/in/octaviocossy",
      github: "https://github.com/Octaviocossy",
    },
  },
  summary:
    "Desarrollador de productos digitales con experiencia en web y móvil. Manejo de React.js, TypeScript, React Native, Next.js, Node.js, .NET, Angular, Tauri, React Query, Zustand, Redux, Prisma ORM, Zod y Turborepo. Conocimientos en APIs e IA. Profesional proactivo y orientado a resultados.",
  education: [
    {
      institution: "UAI - Universidad Abierta Interamericana",
      degree: "Ingeniería en Sistemas Informáticos",
      period: "Abr. 2025 - En curso",
      details: "",
    },
    {
      institution: "Universidad Tecnológica Nacional",
      degree: "Tecnicatura Universitaria en Programación",
      period: "Feb. 2021 - Nov. 2023",
      details: "",
    },
  ],
  experience: [
    {
      company: "Janus Automation",
      role: "Ssr. Fullstack Developer",
      period: "Dic. 2022 - Actualidad",
      description:
        "• Tracking de técnicos y órdenes\n• Tracking de técnicos y órdenes (migración a React Native) \n• Sistema de monitoreo de pérdida de peso en báscula \n• Dashboard de eventos y configuración de equipos internos \n• Rodeo Crane Reporting System (Dashboard gestión de grúas en tiempo real) \n• Dashboard gestión piso de planta (Acería)",
    },
    {
      company: "Gestioner Soft",
      role: "React Developer",
      period: "Jul. 2022 - Dic. 2022",
      description: "• Gestor de Facturas Electrónicas",
    },
  ],
  projects: [
    {
      title: "Kaptia",
      description:
        "Automatiza el análisis de cartera para empresas contables, financieras y de gestión de personal.",
      link: "https://kaptia.com.ar/",
    },
    {
      title: "MDG",
      description:
        "Plataforma médica integral que permite a profesionales de la salud gestionar datos de pacientes, generar reportes médicos en PDF y mantener historial completo de registros.",
      link: "",
    },
    {
      title: "GEVP",
      description:
        "Gestor de socios para el Club Gimnasia y Esgrima de Villa del Parque. Es una aplicación web que permite al club gestionar socios y actividades.",
      link: "",
    },
  ],
  skills: {
    technical: [
      "React",
      "Next.js",
      "React Query",
      "Zustand",
      "Redux",
      "React Native",
      "ElectronJS",
      "Node.js",
      "ExpressJS",
      "TypeScript",
      "JavaScript",
      "Prisma ORM",
      "Drizzle ORM",
      "PostgreSQL",
      "SQL Server",
      "Angular",
      ".NET 8",
      "HTML",
      "CSS",
      "Sass",
      "TailwindCSS",
    ],
    soft: [
      "Comunicación",
      "Colaboración en equipo",
      "Proactividad",
      "Resolución de problemas",
      "Liderazgo",
    ],
  },
  languages: [
    {
      name: "Español",
      level: "Nativo",
    },
    {
      name: "Inglés",
      level: "Intermedio",
    },
  ],
};

export default function CVGenerator() {
  const [jsonInput, setJsonInput] = useState(
    JSON.stringify(sampleData, null, 2)
  );
  const [parsedData, setParsedData] = useState(sampleData);
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<"en" | "es">("en");

  const handleJsonChange = (value: string) => {
    setJsonInput(value);
    try {
      const parsed = JSON.parse(value);
      setParsedData(parsed);
      setError("");
    } catch (err) {
      setError("Invalid JSON format. Please check your syntax.");
    }
  };

  const handleGeneratePDF = async () => {
    if (error || !parsedData) return;

    setIsGenerating(true);
    try {
      await generatePDF(parsedData, selectedLanguage);
    } catch (err) {
      setError("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Professional CV Generator
          </h1>
          <p className="text-muted-foreground text-lg">
            Create Harvard-style CVs from JSON data
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  JSON Input
                </CardTitle>
                <CardDescription>
                  Enter your CV data in JSON format. Use the sample data as a
                  template.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={jsonInput}
                  onChange={(e) => handleJsonChange(e.target.value)}
                  className="min-h-[400px] font-mono text-sm"
                  placeholder="Enter your CV data in JSON format..."
                />

                {error && (
                  <Alert className="mt-4" variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="flex gap-2 mt-4 items-center">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <Select
                      value={selectedLanguage}
                      onValueChange={(value: "en" | "es") =>
                        setSelectedLanguage(value)
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button
                    onClick={handleGeneratePDF}
                    disabled={!!error || !parsedData || isGenerating}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    {isGenerating ? "Generating..." : "Generate PDF"}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() =>
                      handleJsonChange(JSON.stringify(sampleData, null, 2))
                    }
                  >
                    Load Sample Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
                <CardDescription>
                  Preview how your CV will look when generated
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!error && parsedData ? (
                  <CVPreview data={parsedData} language={selectedLanguage} />
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Enter valid JSON data to see preview</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
