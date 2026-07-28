import { Bell, Moon, Globe, Shield, Database, Info } from "lucide-react";

function Settings() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Settings</h1>

        <p className="mt-1 text-slate-500">
          Application preferences and information.
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
  );
}

function Section({ title, icon, children }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow">
      <div className="flex items-center gap-2 border-b px-6 py-4">
        <span className="text-blue-600">{icon}</span>
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>

      <div className="divide-y">{children}</div>
    </div>
  );
}

function SettingRow({ title, value }) {
  return (
    <div className="flex items-center justify-between px-6 py-4">
      <span className="text-slate-600">{title}</span>

      <span className="font-medium text-slate-800">{value}</span>
    </div>
  );
}

export default Settings;
