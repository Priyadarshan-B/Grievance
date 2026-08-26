import { motion } from "framer-motion";

function StatCard({ title, value, icon: Icon, tone = "cyan" }) {
  const toneStyles = {
    cyan: "from-[#1E293B] via-[#1E293B] to-[#164E63] border-t-cyan-400/80",
    teal: "from-[#1E293B] via-[#1E293B] to-[#14532D] border-t-emerald-400/80",
    amber: "from-[#1E293B] via-[#1E293B] to-[#78350F] border-t-amber-400/80",
    rose: "from-[#1E293B] via-[#1E293B] to-[#881337] border-t-rose-400/80",
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className={`group relative flex min-h-[120px] flex-col justify-between gap-3 overflow-hidden rounded-2xl border border-[#334155] border-t-2 bg-gradient-to-br p-4 text-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-300 ease-in-out hover:border-cyan-500/60 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.65)] ${toneStyles[tone] || toneStyles.cyan}`}>
        <div className="relative z-10 min-w-0">
          <p className="break-words text-sm font-semibold uppercase leading-5 tracking-[0.08em] opacity-95">
            {title}
          </p>
        </div>

        <div className="relative z-10 flex min-w-0 items-end justify-between gap-3">
          <h2 className="min-w-0 flex-1 break-words text-3xl font-black leading-none drop-shadow-lg sm:text-3xl 2xl:text-4xl">
            {value}
          </h2>

          <motion.div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_12px_30px_rgba(15,23,42,0.35)] sm:h-11 sm:w-11"
            variants={iconVariants}
            whileHover="hover"
          >
            <Icon size={20} className="drop-shadow-[0_2px_8px_rgba(255,255,255,0.35)]" />
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
}

export default StatCard;
