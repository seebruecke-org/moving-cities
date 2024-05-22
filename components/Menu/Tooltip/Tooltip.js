import clsx from 'clsx';

import Paragraph from '@/components/Paragraph';

export default function Tooltip({ children, style, className, ...props }) {
  return (
    <div
      className={clsx(
        'xl:absolute xl:top-full xl:left-0 xl:bg-white p-6 xl:rounded-lg xl:border-2 w-[300px] xl:mt-4 z-50',
        className
      )}
    >
      <span
        className="hidden md:block w-6 h-6 bg-white border-l-2 border-t-2 absolute top-0 z-20 left-20"
        style={{
          transform: 'rotate(45deg) translateX(-50%) translateY(calc(-50% + 2px))',
          ...style
        }}
        {...props}
      />

      <Paragraph isSmall className="!text-s">
        {children}
      </Paragraph>
    </div>
  );
}
