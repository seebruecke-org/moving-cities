export default function MenuOverlay({ children }) {
  return (
    <div className="absolute left:0 md:left-16 bottom:16 md:bottom-auto md:top-0 w-full h-full bg-gradient-to-l from-pink-300 to-red-300 text-white z-40 md:pl-20 md:pt-20 md:pb-20 flex flex-col">
      {children}
    </div>
  );
}
