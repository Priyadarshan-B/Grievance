import { motion } from "framer-motion";

function Card({
  children,
  className = "",
  hoverable = true,
  variant = "default",
}) {
  const variants = {
    default: "bg-gradient-to-br from-white/80 to-slate-50/80 border border-white/50",
    primary: "bg-gradient-to-br from-blue-100/60 via-purple-100/60 to-pink-100/60 border border-white/40",
    success: "bg-gradient-to-br from-green-100/60 to-teal-100/60 border border-green-200/40",
    warning: "bg-gradient-to-br from-orange-100/60 to-yellow-100/60 border border-orange-200/40",
  };

  return (
    <motion.div
      whileHover={hoverable ? { y: -6, scale: 1.02 } : {}}
      transition={{ duration: 0.2 }}
      className={`${variants[variant]} rounded-xl shadow-xl backdrop-blur-xl p-6 text-slate-800 hover:shadow-2xl transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default Card;
