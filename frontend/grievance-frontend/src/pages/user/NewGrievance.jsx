import { FileText, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import GrievanceForm from "../../components/grievance/GrievanceForm";

function NewGrievance() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100">
      <div className="space-y-6 p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-cyan-400/30 border-t-2 border-t-cyan-400/80 bg-gradient-to-br from-cyan-950/70 via-[#1E293B] to-[#1E293B] p-5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/40 bg-cyan-500/20 text-cyan-200 shadow-lg shadow-cyan-500/20">
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

        <div className="flex items-center gap-2 rounded-2xl border border-amber-400/30 bg-gradient-to-r from-amber-950/60 to-cyan-950/40 px-4 py-3 text-sm text-amber-100 shadow-lg shadow-amber-950/20">
          <Sparkles className="h-4 w-4" />
          <span>AI-assisted review is enabled for faster triage.</span>
        </div>

        <GrievanceForm />
      </div>
    </div>
  );
}

export default NewGrievance;
