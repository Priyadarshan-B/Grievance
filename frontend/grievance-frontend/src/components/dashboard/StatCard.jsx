import { motion } from "framer-motion";

function StatCard({ title, value, icon: Icon, tone = "cyan", compact = false }) {
  const toneStyles = {
    cyan: "from-[#1E293B] via-[#1E293B] to-[#1E40AF] border-t-blue-500/80",
    teal: "from-[#1E293B] via-[#1E293B] to-[#065F46] border-t-emerald-500/80",
    amber: "from-[#1E293B] via-[#1E293B] to-[#92400E] border-t-amber-500/80",
    rose: "from-[#1E293B] via-[#1E293B] to-[#7F1D1D] border-t-red-500/80",
    violet: "from-[#1E293B] via-[#1E293B] to-[#5B21B6] border-t-violet-500/80",
  };
  const containerVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const iconVariants = {
    hover: {
      scale: 1.15,
      rotate: 8,
      transition: { duration: 0.3 },
    },
  };

  const cardClass = compact
    ? "min-h-[88px] gap-2 p-3"
    : "min-h-[120px] gap-3 p-4";

  const titleClass = compact
    ? "text-[10px] tracking-[0.14em]"
    : "text-sm tracking-[0.08em]";

  const valueClass = compact
    ? "text-2xl sm:text-2xl"
    : "text-3xl sm:text-3xl 2xl:text-4xl";

  const iconClass = compact
    ? "h-9 w-9 sm:h-9 sm:w-9"
    : "h-10 w-10 sm:h-11 sm:w-11";

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className={`group relative flex flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-[#334155] border-t-2 bg-gradient-to-br text-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-300 ease-in-out hover:border-cyan-500/60 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.65)] ${toneStyles[tone] || toneStyles.cyan} ${cardClass}`}>
        <div className="relative z-10 text-center min-w-0">
          <p className={`break-words font-semibold uppercase leading-5 opacity-95 ${titleClass}`}>
            {title}
          </p>
        </div>

        <div className="relative z-10 flex min-w-0 items-center justify-center gap-3">
          <h2 className={`min-w-0 break-words font-black leading-none drop-shadow-lg ${valueClass}`}>
            {value}
          </h2>

          <motion.div
            className={`flex shrink-0 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_12px_30px_rgba(15,23,42,0.35)] ${iconClass}`}
            variants={iconVariants}
            whileHover="hover"
          >
            <Icon size={compact ? 18 : 20} className="drop-shadow-[0_2px_8px_rgba(255,255,255,0.35)]" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default StatCard;
