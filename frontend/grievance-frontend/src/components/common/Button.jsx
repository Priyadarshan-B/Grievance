function Button({
  children,

  type = "button",

  onClick,

  variant = "primary",

  disabled = false,
}) {
  const styles = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",

    secondary: "bg-slate-100 hover:bg-slate-200 text-slate-700",

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
