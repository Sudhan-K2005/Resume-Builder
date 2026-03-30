import { createContext, useContext, useState, type ReactNode } from "react";

interface Project {
  title: string;
  description: string;
  link: string;
}

interface ResumeData {
  name: string;
  email: string;
  location: string;
  summary: string;
  skills: string;
  experience: string;
  projects: Project[];
  education: string;
  certifications: string;
}

interface ResumeContextType {
  step: number;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
  data: ResumeData;
  updateData: (field: keyof ResumeData, value: any) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState(0);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const [data, setData] = useState<ResumeData>({
    name: "Sudhan K",
    email: "k62728539@gmail.com",
    location: "Chennai, Tamil Nadu",
    summary: "Frontend Developer skilled in React.js and modern UI design. Currently learning Java Full Stack Development.",
    skills: "HTML, CSS, JavaScript, React.js, Tailwind CSS, Bootstrap, Java (Learning), Python, Node.js, Express.js, MySQL",
    experience: "Web Development Intern – Mirror Technologies Pvt Ltd (Galo Fitness App)\n\n• Built a fitness tracking web app with calorie tracking, workouts, water tracking, heart rate, and body weight monitoring\n• Implemented authentication (Sign In / Sign Up)\n• Used HTML, CSS, JavaScript, Python, and MySQL",
    projects: [
      {
        title: "AirWave – Flight Booking UI",
        description: "Modern flight booking UI with clean UX and animations",
        link: "https://airwave123.netlify.app/",
      },
      {
        title: "Fashion Store – E-commerce UI",
        description: "Stylish e-commerce frontend with responsive layout",
        link: "https://fashion-store234.netlify.app/",
      },
    ],
    education: "B.Sc Computer Science – SRM Institute (2025) – CGPA: 8.07\nHSC – 82% (2022)\nSSLC – 63.6% (2020)",
    certifications: "Java Full Stack Development (In Progress)",
  });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 7));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const updateData = (field: keyof ResumeData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ResumeContext.Provider
      value={{ step, nextStep, prevStep, setStep, data, updateData, theme, toggleTheme }}
    >
      <div className={theme === "dark" ? "dark" : ""}>{children}</div>
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
};