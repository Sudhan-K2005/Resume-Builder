import type { ReactNode } from "react";
import { useResume } from "../context/ResumeContext";
import { Moon, Sun, LayoutPanelLeft, Download } from "lucide-react";

const Layout = ({ children }: { children: ReactNode }) => {
  const { theme, toggleTheme } = useResume();

  return (
    <div className={`min-h-screen transition-colors duration-500 overflow-hidden relative ${
      theme === "dark" ? "bg-[#030712] text-white" : "bg-slate-50 text-slate-900"
    }`}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="blob top-[-10%] left-[-10%] opacity-50"></div>
        <div className="blob blob-2 bottom-[-10%] right-[-10%] opacity-40"></div>
        <div className="blob blob-3 top-[30%] left-[60%] opacity-30"></div>
      </div>

      {/* Glass Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-premium px-8 py-3 flex justify-between items-center border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-600/30">
            <LayoutPanelLeft size={22} />
          </div>
          <span className="text-xl font-bold tracking-tight">Resume<span className="text-indigo-500">Pro</span></span>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-slate-400 hover:text-white"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </nav>

      {/* Main Container */}
      <main className="relative z-10 pt-32 pb-12 px-6 max-w-6xl mx-auto min-h-screen flex flex-col items-center">
        <div className="w-full h-full flex flex-col">
          {children}
        </div>
      </main>

      {/* Mobile Float Button for Preview */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button className="bg-indigo-600 text-white p-4 rounded-full shadow-2xl shadow-indigo-500/50 hover:scale-110 transition-all">
          <Download size={24} />
        </button>
      </div>
    </div>
  );
};

export default Layout;
