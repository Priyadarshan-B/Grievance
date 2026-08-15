function AuthCard({ title, subtitle, children }) {
  return (
    <div className="w-full max-w-md rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.9),rgba(15,23,42,0.74))] p-7 shadow-[0_30px_80px_rgba(15,23,42,0.7)] backdrop-blur-xl sm:p-8">
      <div className="mb-7 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 shadow-[0_16px_30px_rgba(59,130,246,0.45)]">
          <span className="text-xl font-bold text-white">G</span>
        </div>

        <h1 className="text-3xl font-bold text-white">{title}</h1>

        <p className="mt-2 text-sm text-slate-300">{subtitle}</p>
      </div>

      {children}
    </div>
  );
}

export default AuthCard;