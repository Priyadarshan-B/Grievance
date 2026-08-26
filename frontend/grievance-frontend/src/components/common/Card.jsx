import { motion } from "framer-motion";

function Card({
  children,
  className = "",
  hoverable = true,
  variant = "default",
}) {
  const variants = {
    default: "bg-gradient-to-br from-[#1E293B] via-[#1E293B] to-[#164E63] border border-[#334155] before:bg-cyan-400/70",
    primary: "bg-gradient-to-br from-[#1E293B] via-[#1E293B] to-[#164E63] border border-[#334155] before:bg-cyan-400/70",
    success: "bg-gradient-to-br from-[#1E293B] via-[#1E293B] to-[#14532D] border border-[#334155] before:bg-emerald-400/70",
    warning: "bg-gradient-to-br from-[#1E293B] via-[#1E293B] to-[#78350F] border border-[#334155] before:bg-amber-400/70",
  };

  return (
    <motion.div
      whileHover={hoverable ? { y: -4, scale: 1.02 } : {}}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`${variants[variant]} relative overflow-hidden rounded-xl p-6 text-slate-100 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] before:absolute before:inset-x-0 before:top-0 before:h-px transition-all duration-300 ease-in-out hover:border-cyan-500/60 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.65)] ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default Card;
