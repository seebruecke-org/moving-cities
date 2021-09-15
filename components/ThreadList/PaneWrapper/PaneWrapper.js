export default function PaneWrapper({ children }) {
  return (
    <div className="relative z-10 max-w-6xl w-full">
      <span className="absolute top-0 left-0 w-3 bg-gradient-to-r from-black to-transparent h-full opacity-20 hidden md:block" />
      {children}
      <span className="absolute top-0 left-full w-3 bg-gradient-to-r from-black to-transparent h-full opacity-20 hidden md:block" />
    </div>
  );
}
