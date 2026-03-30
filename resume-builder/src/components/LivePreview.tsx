import { useResume } from "../context/ResumeContext";
import { Download, Mail, MapPin, ExternalLink, Github } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";

const LivePreview = () => {
  const { data } = useResume();
  const resumeRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (!resumeRef.current) return;
    const canvas = await html2canvas(resumeRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${data.name || "Resume"}_Resume.pdf`);
  };

  return (
    <div className="flex flex-col h-full">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4 sticky top-0 bg-white/5 backdrop-blur-md p-3 z-50 rounded-xl border border-white/10">
        <h3 className="text-lg font-semibold">Resume Preview</h3>

        <button
          onClick={downloadPDF}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-105 text-white px-4 py-2 rounded-lg transition-all shadow-lg"
        >
          <Download size={16} />
          Download PDF
        </button>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto pr-2">

        <div
          ref={resumeRef}
          className="bg-white text-slate-800 p-8 shadow-2xl rounded-md min-h-[1056px] w-full max-w-[800px] mx-auto"
        >

          {/* HEADER */}
          <header className="border-b-2 border-indigo-600 pb-4 mb-6">
            <h1 className="text-4xl font-bold text-slate-900 mb-2 uppercase tracking-wide">
              {data.name || "Sudhan K"}
            </h1>

            <div className="flex flex-wrap gap-4 text-sm text-slate-600 font-medium">
              <span className="flex items-center gap-1">
                <Mail size={14} className="text-indigo-600" />
                {data.email || "k62728539@gmail.com"}
              </span>

              <span className="flex items-center gap-1">
                <MapPin size={14} className="text-indigo-600" />
                {data.location || "Chennai, Tamil Nadu"}
              </span>
            </div>
          </header>

          {/* BODY */}
          <div className="space-y-6 text-[13px] leading-relaxed">

            {/* SUMMARY */}
            <section>
              <h2 className="section-title">Professional Summary</h2>
              <p>{data.summary}</p>
            </section>

            {/* SKILLS */}
            <section>
              <h2 className="section-title">Technical Skills</h2>
              <p className="font-medium">{data.skills}</p>
            </section>

            {/* EXPERIENCE */}
            <section>
              <h2 className="section-title">Experience</h2>
              <div className="whitespace-pre-line bg-slate-50 p-3 rounded-md">
                {data.experience}
              </div>
            </section>

            {/* 🔥 PROJECTS (UPGRADED) */}
            <section>
              <h2 className="section-title">Featured Projects</h2>

              <div className="grid gap-4">

                {data.projects?.map((proj: any, i: number) => (
                  <div
                    key={i}
                    className="group bg-gradient-to-br from-indigo-50 to-white p-4 rounded-xl border border-indigo-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* TITLE */}
                    <h3
                      className="font-bold text-indigo-900 text-[15px] cursor-pointer hover:text-indigo-600 flex items-center gap-2"
                      onClick={() => window.open(proj.link, "_blank")}
                    >
                      {proj.title}
                      <ExternalLink size={14} />
                    </h3>

                    {/* DESCRIPTION */}
                    <p className="text-slate-600 text-xs mt-2">
                      {proj.description}
                    </p>

                    {/* BUTTONS */}
                    <div className="flex gap-3 mt-3">

                      {/* LIVE */}
                      <button
                        onClick={() => window.open(proj.link, "_blank")}
                        className="flex items-center gap-1 text-xs bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition"
                      >
                        Live
                        <ExternalLink size={12} />
                      </button>

                      {/* GITHUB (optional) */}
                      {proj.github && (
                        <button
                          onClick={() => window.open(proj.github, "_blank")}
                          className="flex items-center gap-1 text-xs bg-black text-white px-3 py-1 rounded hover:bg-gray-800 transition"
                        >
                          <Github size={12} />
                          Code
                        </button>
                      )}

                    </div>

                    {/* LINK TEXT */}
                    <p className="text-[10px] text-indigo-400 mt-2 truncate">
                      {proj.link}
                    </p>
                  </div>
                ))}

              </div>
            </section>

            {/* EDUCATION */}
            <section>
              <h2 className="section-title">Education</h2>
              <div className="whitespace-pre-line">
                {data.education}
              </div>
            </section>

            {/* CERTIFICATIONS */}
            <section>
              <h2 className="section-title">Certifications</h2>
              <p>{data.certifications}</p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePreview;