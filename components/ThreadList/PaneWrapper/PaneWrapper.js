export default function PaneWrapper({ children }) {
  return (
    <div className="absolute top-0 left-full h-full z-10 max-w-5xl">
      <span className="absolute top-0 left-0 w-3 bg-gradient-to-r from-black to-yellow-300 h-full opacity-20" />
      {children}
      <span className="absolute top-0 left-full w-3 bg-gradient-to-r from-black to-yellow-300 h-full opacity-20" />
    </div>
  );
}
