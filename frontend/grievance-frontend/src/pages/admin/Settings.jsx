import { Bell, Shield, Database } from "lucide-react";

function Settings() {
  return (
    <div className="min-h-screen bg-[#0B0F19] px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="rounded-3xl border border-cyan-400/30 border-t-2 border-t-cyan-400/80 bg-gradient-to-br from-cyan-950/65 via-[#1E293B] to-violet-950/25 p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.55)]">
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

        <Section title="Preferences" icon={<Bell size={20} />} tone="cyan">
          <SettingRow title="Email Notifications" value="Coming Soon" />
          <SettingRow title="Browser Notifications" value="Coming Soon" />
          <SettingRow title="Dark Mode" value="Coming Soon" />
        </Section>

        <Section title="Security" icon={<Shield size={20} />} tone="rose">
          <SettingRow title="Authentication" value="Google OAuth" />
          <SettingRow title="Session" value="Secure" />
        </Section>

        <Section title="Application" icon={<Database size={20} />} tone="violet">
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

function Section({ title, icon, children, tone }) {
  const toneStyles = {
    cyan: "border-cyan-400/25 from-cyan-950/40 to-[#1E293B] text-cyan-300",
    rose: "border-rose-400/25 from-rose-950/35 to-[#1E293B] text-rose-300",
    violet: "border-violet-400/25 from-violet-950/35 to-[#1E293B] text-violet-300",
  };

  return (
    <div className={`overflow-hidden rounded-3xl border border-t-2 bg-gradient-to-br shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] ${toneStyles[tone] || toneStyles.cyan}`}>
      <div className="flex items-center gap-3 border-b border-[#334155] bg-slate-900/35 px-6 py-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
          {icon}
        </span>
        <h2 className="text-lg font-semibold text-white">{title}</h2>
      </div>

      <div className="divide-y divide-[#334155]/70">{children}</div>
    </div>
  );
}

function SettingRow({ title, value }) {
  return (
    <div className="flex items-center justify-between px-6 py-4 transition hover:bg-white/5">
      <span className="text-slate-300">{title}</span>
      <span className="font-medium text-white">{value}</span>
    </div>
  );
}

export default Settings;
