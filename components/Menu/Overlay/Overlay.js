import clsx from 'clsx';
import { forwardRef } from 'react';

function MenuOverlay({ children, isOpen = false, setIsOverlayOpen }, ref) {
  return (
    <div
      className={clsx(
        'fixed left:0 xl:left-20 bottom:16 xl:bottom-auto xl:top-0 w-full h-full bg-gradient-to-bl from-red-300 to-pink-300 text-white z-40 px-8 pt-32 xl:hidden pb-4 flex flex-col max-h-screen',
        !isOpen && 'hidden'
      )}
      ref={ref}
    >
      <span className="absolute top-0 left-0 w-3 bg-gradient-to-r from-black h-full opacity-20" />
      {children}
    </div>
  );
}

export default forwardRef(MenuOverlay);
