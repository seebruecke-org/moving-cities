import Paragraph from '@/components/Paragraph';

export default function Tooltip({ children }) {
  return (
    <div className="md:absolute md:top-full md:left-2/4 md:bg-white p-8 md:rounded-lg md:border-2 w-full md:-translate-x-2/4 md:mt-4">
      <span className="hidden md:block w-6 h-6 bg-white border-l-2 border-t-2 rotate-45 absolute top-0 -translate-y-3 z-20 left-20" />

      <Paragraph isSmall>{children}</Paragraph>
    </div>
  );
}
