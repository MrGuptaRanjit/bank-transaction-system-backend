import { Link } from "react-router";

const Button = ({
  children,
  to,
  variant = "primary",
  className = "",
}) => {
  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-500",

    secondary:
      "border border-white/15 bg-white/10 text-white hover:bg-white/15",

    dark:
      "bg-slate-950 text-white hover:bg-slate-800",

    light:
      "bg-white text-blue-700 hover:bg-blue-50",

    outline:
      "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50",
  };

  const classes = `
    inline-flex
    items-center
    justify-center
    gap-2
    rounded-xl
    px-6
    py-3.5
    font-semibold
    transition-colors
    duration-200
    ${variants[variant]}
    ${className}
  `;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes}>
      {children}
    </button>
  );
};

export default Button;