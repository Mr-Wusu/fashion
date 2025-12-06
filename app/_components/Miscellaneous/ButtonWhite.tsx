export function ButtonWhite({
  children,
  className,
  type,
  onClick,
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`box-content border border-rose-700 active:scale-95 w-[100px]  py-1 tracking-wide rounded self-center transition-bg duration-300 ease-in-out ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
