import Paragraph from '@/components/Paragraph';

export default function Tooltip({ children, style, ...props }) {
  return (
    <div className="md:absolute md:top-full md:left-2/4 md:bg-white p-6 md:rounded-lg md:border-2 w-full md:-translate-x-2/4 md:mt-4">
      <span
        className="hidden md:block w-6 h-6 bg-white border-l-2 border-t-2 absolute top-0 z-20 left-20"
        style={{
          transform: 'rotate(45deg) translateY(calc(-50% - 5px))',
          ...style
        }}
        {...props}
      />

      <Paragraph isSmall>{children}</Paragraph>
    </div>
  );
}
