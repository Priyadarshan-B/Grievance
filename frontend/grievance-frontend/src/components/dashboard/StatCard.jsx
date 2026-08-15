import { motion } from "framer-motion";

function StatCard({ title, value, icon: Icon, color = "from-blue-500 to-blue-600" }) {
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
      whileHover={{ y: -8 }}
    >
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${color} p-6 shadow-[0_18px_45px_rgba(15,23,42,0.22)] hover:shadow-[0_22px_50px_rgba(15,23,42,0.3)] transition-all duration-300 backdrop-blur-sm border border-white/30 group`}>
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-white opacity-0 rounded-full group-hover:opacity-15 transition-all duration-300 blur-3xl"></div>

        <div className="relative z-10 flex items-center justify-between gap-4">
          <div className="text-white">
            <p className="text-sm font-semibold opacity-95 tracking-[0.08em] uppercase">{title}</p>
            <h2 className="mt-3 text-4xl md:text-5xl font-black drop-shadow-lg leading-none">
              {value}
            </h2>
          </div>

          <motion.div
            className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900/20 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_12px_30px_rgba(15,23,42,0.2)] backdrop-blur-sm border border-white/30"
            variants={iconVariants}
            whileHover="hover"
          >
            <Icon size={30} className="drop-shadow-[0_2px_8px_rgba(255,255,255,0.35)]" />
          </motion.div>
        </div>

        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-r from-transparent via-white to-transparent -skew-x-12 group-hover:translate-x-full transition-all duration-700"></div>
      </div>
    </motion.div>
  );
}

export default StatCard;
