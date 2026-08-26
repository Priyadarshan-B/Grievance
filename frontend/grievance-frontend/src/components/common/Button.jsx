function Button({
  children,

  type = "button",

  onClick,

  variant = "primary",

  disabled = false,
}) {
  const styles = {
    primary: "bg-cyan-500 hover:bg-cyan-400 text-slate-950",

    secondary: "bg-slate-700 hover:bg-slate-600 text-white",

    danger: "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-5 py-2.5 rounded-lg font-medium transition disabled:opacity-50 ${styles[variant]}`}
    >
      {children}
    </button>
  );
}

export default Button;
