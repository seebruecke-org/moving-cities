export default function MenuOverlay({ children }) {
  return (
    <div className="absolute left:0 md:left-12 bottom:12 md:bottom-auto md:top-0 w-full h-full bg-pink-300 z-20 text-white">
      {children}
    </div>
  );
}
