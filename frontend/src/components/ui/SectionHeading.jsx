const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
}) => {
  const alignment =
    align === "center"
      ? "mx-auto text-center"
      : "";

  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow && (
        <p
          className={`text-sm font-semibold uppercase tracking-[0.18em] ${
            dark ? "text-blue-400" : "text-blue-600"
          }`}
        >
          {eyebrow}
        </p>
      )}

      <h2
        className={`mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl ${
          dark ? "text-white" : "text-slate-950"
        }`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mt-5 text-base leading-7 sm:text-lg ${
            dark ? "text-slate-400" : "text-slate-500"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;