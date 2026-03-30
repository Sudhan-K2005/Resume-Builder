import { useResume } from "../context/ResumeContext";
import GlassCard from "./GlassCard";
import VehicleProgress from "./VehicleProgress";
import LivePreview from "./LivePreview"; // Import LivePreview
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  FileText, 
  Hammer, 
  Briefcase, 
  Cpu, 
  GraduationCap, 
  Award,
  ArrowRight,
  ArrowLeft,
  Plus,
  Trash2,
  Sparkles
} from "lucide-react";

const StepForm = () => {
  const { step, nextStep, prevStep, data, updateData, setStep } = useResume();

  return (
    <div className="max-w-4xl mx-auto w-full">
      <VehicleProgress step={step} totalSteps={8} /> {/* Updated to 8 total steps */}
      
      <GlassCard className="mb-8 min-h-[600px] flex flex-col overflow-hidden">
        <div className="flex-1 relative p-2">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="w-full h-full"
            >
              {renderStepContent(step, data, updateData)}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/10 px-4 pb-4">
          <button
            onClick={prevStep}
            disabled={step === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-xl hover:bg-white/5 transition-all text-slate-400 disabled:opacity-30 disabled:pointer-events-none"
          >
            <ArrowLeft size={18} />
            Back
          </button>
          
          <button
            onClick={nextStep}
            disabled={step === 7}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl transition-all shadow-lg disabled:opacity-50 group font-bold ${
              step === 6 ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20" : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/20"
            }`}
          >
            {step === 6 ? (
              <>
                Generate Resume
                <Sparkles size={18} className="group-hover:scale-125 transition-transform" />
              </>
            ) : step === 7 ? (
              "All Done!"
            ) : (
              <>
                Next Step
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </GlassCard>

      {/* Quick Nav dots */}
      <div className="flex justify-center gap-3">
        {[...Array(8)].map((_, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              step === i ? "bg-indigo-500 w-8" : "bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Helper function to keep StepForm clean
const renderStepContent = (step: number, data: any, updateData: any) => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-8 p-4">
            <div className="space-y-2">
              <h2 className="text-5xl font-extrabold flex items-center gap-5 text-glow tracking-tight">
                <div className="p-3 bg-indigo-500/20 rounded-2xl animate-float">
                  <User className="text-indigo-400 w-12 h-12" />
                </div>
                Personal <span className="text-indigo-500">Details</span>
              </h2>
              <p className="text-slate-400 text-lg ml-20">Start by defining your professional identity.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Full Name</label>
                <input
                  value={data.name}
                  onChange={(e) => updateData("name", e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/10 outline-none transition-all text-xl placeholder:text-slate-600"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Email Address</label>
                <input
                  value={data.email}
                  onChange={(e) => updateData("email", e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/10 outline-none transition-all text-xl placeholder:text-slate-600"
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-3 md:col-span-2">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Location</label>
                <input
                  value={data.location}
                  onChange={(e) => updateData("location", e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/10 outline-none transition-all text-xl placeholder:text-slate-600"
                  placeholder="City, State, Country"
                />
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-8 p-4">
            <div className="space-y-2">
              <h2 className="text-5xl font-extrabold flex items-center gap-5 text-glow tracking-tight">
                <div className="p-3 bg-fuchsia-500/20 rounded-2xl animate-float">
                  <FileText className="text-fuchsia-400 w-12 h-12" />
                </div>
                Professional <span className="text-fuchsia-500">Summary</span>
              </h2>
              <p className="text-slate-400 text-lg ml-20">Your elevator pitch to recruiters.</p>
            </div>
            <textarea
              value={data.summary}
              onChange={(e) => updateData("summary", e.target.value)}
              className="w-full h-80 bg-white/5 border border-white/10 rounded-2xl px-8 py-6 focus:ring-2 focus:ring-fuchsia-500/50 focus:bg-white/10 outline-none transition-all resize-none text-xl leading-relaxed placeholder:text-slate-600"
              placeholder="Write a brief professional overview..."
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-8 p-4">
            <div className="space-y-2">
              <h2 className="text-5xl font-extrabold flex items-center gap-5 text-glow tracking-tight">
                <div className="p-3 bg-cyan-500/20 rounded-2xl animate-float">
                  <Hammer className="text-cyan-400 w-12 h-12" />
                </div>
                Technical <span className="text-cyan-500">Skills</span>
              </h2>
              <p className="text-slate-400 text-lg ml-20">The tools that power your expertise.</p>
            </div>
            <textarea
              value={data.skills}
              onChange={(e) => updateData("skills", e.target.value)}
              className="w-full h-80 bg-white/5 border border-white/10 rounded-2xl px-8 py-6 focus:ring-2 focus:ring-cyan-500/50 focus:bg-white/10 outline-none transition-all resize-none text-xl leading-relaxed placeholder:text-slate-600"
              placeholder="React, Node.js, Python, Tailwind..."
            />
          </div>
        );
      case 3:
        return (
          <div className="space-y-8 p-4">
            <div className="space-y-2">
              <h2 className="text-5xl font-extrabold flex items-center gap-5 text-glow tracking-tight">
                <div className="p-3 bg-amber-500/20 rounded-2xl animate-float">
                  <Briefcase className="text-amber-400 w-12 h-12" />
                </div>
                Work <span className="text-amber-500">Experience</span>
              </h2>
              <p className="text-slate-400 text-lg ml-20">Your professional journey and impact.</p>
            </div>
            <textarea
              value={data.experience}
              onChange={(e) => updateData("experience", e.target.value)}
              className="w-full h-[500px] bg-white/5 border border-white/10 rounded-2xl px-8 py-6 focus:ring-2 focus:ring-amber-500/50 focus:bg-white/10 outline-none transition-all resize-none text-xl leading-relaxed placeholder:text-slate-600 custom-scrollbar"
              placeholder="Describe your career history..."
            />
          </div>
        );
      case 4:
        return (
          <div className="space-y-8 p-4">
            <div className="flex justify-between items-end">
              <div className="space-y-2">
                <h2 className="text-5xl font-extrabold flex items-center gap-5 text-glow tracking-tight">
                  <div className="p-3 bg-emerald-500/20 rounded-2xl animate-float">
                    <Cpu className="text-emerald-400 w-12 h-12" />
                  </div>
                  Featured <span className="text-emerald-500">Projects</span>
                </h2>
                <p className="text-slate-400 text-lg ml-20">Showcase your best builds.</p>
              </div>
              <button
                onClick={() => updateData("projects", [...data.projects, { title: "", description: "", link: "", github: "" }])}
                className="bg-emerald-600 hover:bg-emerald-500 text-white p-4 rounded-2xl transition-all shadow-lg shadow-emerald-600/30 group"
              >
                <Plus size={28} className="group-hover:rotate-90 transition-transform" />
              </button>
            </div>
            <div className="space-y-8 max-h-[600px] overflow-y-auto pr-6 custom-scrollbar pt-4">
              {data.projects.map((proj: any, i: number) => (
                <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-[2rem] space-y-6 relative group hover:border-emerald-500/50 hover:bg-white/[0.07] transition-all">
                  <button
                    onClick={() => updateData("projects", data.projects.filter((_: any, idx: number) => idx !== i))}
                    className="absolute top-8 right-8 text-slate-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all scale-125"
                  >
                    <Trash2 size={24} />
                  </button>
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Project Title</label>
                    <input
                      value={proj.title}
                      onChange={(e) => {
                        const newProjs = [...data.projects];
                        newProjs[i].title = e.target.value;
                        updateData("projects", newProjs);
                      }}
                      className="w-full bg-transparent border-b-2 border-white/10 pb-3 focus:border-emerald-500 outline-none font-bold text-2xl tracking-tight transition-all"
                      placeholder="Project Name"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Description</label>
                    <textarea
                      value={proj.description}
                      onChange={(e) => {
                        const newProjs = [...data.projects];
                        newProjs[i].description = e.target.value;
                        updateData("projects", newProjs);
                      }}
                      className="w-full bg-transparent text-slate-400 border-none outline-none resize-none h-28 text-xl leading-relaxed"
                      placeholder="What makes this project stand out?"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-emerald-500/60 uppercase tracking-widest">Deployment Link</label>
                      <input
                        value={proj.link}
                        onChange={(e) => {
                          const newProjs = [...data.projects];
                          newProjs[i].link = e.target.value;
                          updateData("projects", newProjs);
                        }}
                        className="w-full bg-white/5 px-4 py-3 rounded-xl text-emerald-400 outline-none text-sm font-medium border border-white/5 focus:border-emerald-500/50"
                        placeholder="https://your-app.netlify.app"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-indigo-500/60 uppercase tracking-widest">GitHub Repo (Optional)</label>
                      <input
                        value={proj.github || ""}
                        onChange={(e) => {
                          const newProjs = [...data.projects];
                          newProjs[i].github = e.target.value;
                          updateData("projects", newProjs);
                        }}
                        className="w-full bg-white/5 px-4 py-3 rounded-xl text-indigo-400 outline-none text-sm font-medium border border-white/5 focus:border-indigo-500/50"
                        placeholder="https://github.com/..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-8 p-4">
            <div className="space-y-2">
              <h2 className="text-5xl font-extrabold flex items-center gap-5 text-glow tracking-tight">
                <div className="p-3 bg-blue-500/20 rounded-2xl animate-float">
                  <GraduationCap className="text-blue-400 w-12 h-12" />
                </div>
                Academic <span className="text-blue-500">History</span>
              </h2>
              <p className="text-slate-400 text-lg ml-20">Your educational background.</p>
            </div>
            <textarea
              value={data.education}
              onChange={(e) => updateData("education", e.target.value)}
              className="w-full h-80 bg-white/5 border border-white/10 rounded-2xl px-8 py-6 focus:ring-2 focus:ring-blue-500/50 focus:bg-white/10 outline-none transition-all resize-none text-xl leading-relaxed placeholder:text-slate-600"
              placeholder="Your academic background..."
            />
          </div>
        );
      case 6:
        return (
          <div className="space-y-8 p-4">
            <div className="space-y-2">
              <h2 className="text-5xl font-extrabold flex items-center gap-5 text-glow tracking-tight">
                <div className="p-3 bg-rose-500/20 rounded-2xl animate-float">
                  <Award className="text-rose-400 w-12 h-12" />
                </div>
                Honors & <span className="text-rose-500">Awards</span>
              </h2>
              <p className="text-slate-400 text-lg ml-20">Celebrating your achievements.</p>
            </div>
            <textarea
              value={data.certifications}
              onChange={(e) => updateData("certifications", e.target.value)}
              className="w-full h-80 bg-white/5 border border-white/10 rounded-2xl px-8 py-6 focus:ring-2 focus:ring-rose-500/50 focus:bg-white/10 outline-none transition-all resize-none text-xl leading-relaxed placeholder:text-slate-600"
              placeholder="Certificates and awards..."
            />
          </div>
        );
      case 7:
        return (
          <div className="h-full">
             <LivePreview />
          </div>
        );
      default:
        return null;
    }
}

export default StepForm;
