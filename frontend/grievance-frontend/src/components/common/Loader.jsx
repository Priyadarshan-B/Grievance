function Loader() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <div className="flex items-center gap-3">
        <span className="text-3xl font-black tracking-tight text-blue-300">
          Loading
        </span>

        <span className="flex gap-1 pt-2">
          {[0, 1, 2].map((dot) => (
            <span
              key={dot}
              className="h-2.5 w-2.5 rounded-full bg-blue-400 animate-pulse"
              style={{
                animationDelay: `${dot * 180}ms`,
                animationDuration: "1.1s",
              }}
            />
          ))}
        </span>
      </div>

      <div className="relative h-4 w-[280px] overflow-hidden rounded-full border border-blue-400/40 bg-slate-900/70 shadow-[0_0_20px_rgba(59,130,246,0.18)]">
        <div className="absolute inset-y-0 left-0 w-1/2 rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-300 shadow-[0_0_18px_rgba(96,165,250,0.9)] animate-pulse" />
      </div>
    </div>
  );
}

export default Loader;
