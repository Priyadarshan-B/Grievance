import { FileText, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import GrievanceForm from "../../components/grievance/GrievanceForm";

function NewGrievance() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(135deg,#020817_0%,#0f172a_18%,#111827_32%,#1e3a8a_62%,#312e81_100%)]">
      <div className="absolute -top-20 left-0 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute right-0 top-10 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl" />

      <div className="relative z-10 space-y-6 p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-white/60 bg-white/10 p-5 shadow-[0_20px_60px_rgba(59,130,246,0.12)] backdrop-blur-xl"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30">
              <FileText className="h-6 w-6" />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-white">New Grievance</h1>
              <p className="mt-1 text-sm text-slate-200">
                Submit a new grievance for review.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="flex items-center gap-2 rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-100 backdrop-blur-md">
          <Sparkles className="h-4 w-4" />
          <span>AI-assisted review is enabled for faster triage.</span>
        </div>

        <GrievanceForm />
      </div>
    </div>
  );
}

export default NewGrievance;
