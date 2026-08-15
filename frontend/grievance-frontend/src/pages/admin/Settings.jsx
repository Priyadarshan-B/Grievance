import { Bell, Moon, Globe, Shield, Database, Info } from "lucide-react";

function Settings() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.16),transparent_26%),linear-gradient(135deg,#020817_0%,#0f172a_20%,#111827_48%,#1f2937_100%)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="absolute -top-24 left-0 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-violet-400/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl space-y-6">
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.35)] backdrop-blur-xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300">
            Settings
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-white">
            Preferences & Configuration
          </h1>
          <p className="mt-1 text-sm text-slate-300">
            Application preferences and account information.
          </p>
        </div>

        <Section title="Preferences" icon={<Bell size={20} />}>
          <SettingRow title="Email Notifications" value="Coming Soon" />
          <SettingRow title="Browser Notifications" value="Coming Soon" />
          <SettingRow title="Dark Mode" value="Coming Soon" />
        </Section>

        <Section title="Security" icon={<Shield size={20} />}>
          <SettingRow title="Authentication" value="Google OAuth" />
          <SettingRow title="Session" value="Secure" />
        </Section>

        <Section title="Application" icon={<Database size={20} />}>
          <SettingRow
            title="Application"
            value="AI Grievance Management System"
          />
          <SettingRow title="Version" value="v1.0.0" />
          <SettingRow title="Language" value="English" />
        </Section>
      </div>
    </div>
  );
}

function Section({ title, icon, children }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-700/80 bg-slate-900/70 shadow-[0_18px_45px_rgba(15,23,42,0.24)] backdrop-blur-xl">
      <div className="flex items-center gap-3 border-b border-slate-700 bg-gradient-to-r from-slate-800 to-sky-900/40 px-6 py-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
          {icon}
        </span>
        <h2 className="text-lg font-semibold text-white">{title}</h2>
      </div>

      <div className="divide-y divide-slate-700">{children}</div>
    </div>
  );
}

function SettingRow({ title, value }) {
  return (
    <div className="flex items-center justify-between px-6 py-4">
      <span className="text-slate-300">{title}</span>
      <span className="font-medium text-white">{value}</span>
    </div>
  );
}

export default Settings;
