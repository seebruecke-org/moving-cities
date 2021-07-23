export default function PaneWrapper({ children }) {
  return <div className="absolute top-0 left-full h-full z-10 shadow-lg">{children}</div>;
}
