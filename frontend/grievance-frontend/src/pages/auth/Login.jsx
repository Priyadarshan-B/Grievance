import { motion } from "framer-motion";

import AuthCard from "../../components/auth/AuthCard";
import LoginForm from "../../components/auth/LoginForm";

function Login() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.25),transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.28),transparent_30%),linear-gradient(135deg,#020817_0%,#0f172a_22%,#111827_54%,#1e1b4b_100%)] px-4 py-8">
      <div className="absolute -left-20 top-12 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.08),transparent_20%,rgba(125,211,252,0.12),transparent_75%)]" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-5xl overflow-hidden rounded-[32px] border border-white/20 bg-white/5 shadow-[0_30px_80px_rgba(15,23,42,0.7)] backdrop-blur-xl"
      >
        <div className="grid min-h-[680px] md:grid-cols-[1.3fr_1fr]">
          <div className="relative hidden items-center justify-center overflow-hidden border-r border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.75),rgba(30,41,59,0.6),rgba(91,33,182,0.35))] p-10 md:flex">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(96,165,250,0.18),transparent_35%)]" />
            <div className="relative max-w-md space-y-6 text-white">
              <div className="inline-flex items-center rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-cyan-200">
                Grievance Portal
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl font-bold leading-tight text-white">
                  Resolve issues with clarity and speed.
                </h1>
                <p className="text-base leading-7 text-slate-200/90">
                  Track complaints, collaborate with departments, and keep every update visible from a single secure dashboard.
                </p>
              </div>

              <div className="grid gap-4 pt-4 text-sm text-slate-100/90">
                <div className="rounded-2xl border border-white/10 bg-slate-900/30 p-4 backdrop-blur-sm">
                  <p className="font-semibold text-cyan-200">Fast tracking</p>
                  <p className="mt-1 text-slate-200/80">Know the status of every grievance in real time.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-900/30 p-4 backdrop-blur-sm">
                  <p className="font-semibold text-violet-200">Secure access</p>
                  <p className="mt-1 text-slate-200/80">Built for student and faculty workflows with trusted authentication.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center bg-slate-950/60 p-6 sm:p-10">
            <AuthCard title="Welcome back" subtitle="Student / Faculty">
              <LoginForm />
            </AuthCard>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;