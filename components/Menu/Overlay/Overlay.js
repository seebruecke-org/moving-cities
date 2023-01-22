import clsx from 'clsx';
import { forwardRef } from 'react';

function MenuOverlay({ children, isOpen = false, setIsOverlayOpen }, ref) {
  return (
    <div
      className={clsx(
        'absolute left:0 md:left-20 bottom:16 md:bottom-auto md:top-0 w-full h-full bg-gradient-to-br from-red-300 to-pink-300 text-white z-40 px-8 pt-7 md:px-36 xl:px-48 md:pt-20 xl:pt-28 2xl:pt-40 pb-4 md:pb-20 xl:pb-28 2xl:pb-48 flex flex-col max-h-screen',
        !isOpen && 'hidden'
      )}
      ref={ref}
    >
      <button onClick={() => setIsOverlayOpen(false)} className="group font-raptor font-semibold font-2xs md:hidden self-end">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="37"
            height="37"
            viewBox="0 0 37 37"
            className="group-hover:text-grey-300"
        >
          <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="3"
              d="M3.6 3.5l30 30M3.6 33.5l30-30"
          />
        </svg>
      </button>
      <span className="absolute top-0 left-0 w-3 bg-gradient-to-r from-black h-full opacity-20" />
      {children}
    </div>
  );
}

export default forwardRef(MenuOverlay);
