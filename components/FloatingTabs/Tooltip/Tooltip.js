import Paragraph from "@/components/Paragraph"

export default function Tooltip({ children }) {
  return <div className="md:absolute md:top-full md:left-2/4 md:bg-white w-full md:-translate-x-2/4 p-8 md:rounded-lg md:border-2 md:mt-4">
    <Paragraph>
      {children}
    </Paragraph>
  </div>
}
