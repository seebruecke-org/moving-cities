import clsx from 'clsx';
import { forwardRef } from 'react';

function MenuOverlay({ children, isOpen = false }, ref) {
  return (
    <div
      className={clsx("absolute left:0 md:left-20 bottom:16 md:bottom-auto md:top-0 w-full h-full bg-gradient-to-br from-red-300 to-pink-300 text-white z-40 px-8 pt-20 md:pl-20 md:pt-20 md:pb-20 flex flex-col", !isOpen && 'hidden')}
      ref={ref}>
      <span className="absolute top-0 left-0 w-3 bg-gradient-to-r from-black h-full opacity-20" />
      {children}
    </div>
  );
}

export default forwardRef(MenuOverlay);
