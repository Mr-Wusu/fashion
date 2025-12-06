export default function Modal({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full ">
      <div className="h-full w-full opacity-15 z-30" />
      <div>{children}</div>
    </div>
  );
}
