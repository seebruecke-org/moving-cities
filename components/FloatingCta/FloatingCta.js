import Button from "@/components/Button";

export default function FloatingCta({ target, label }) {
  return <div className="absolute bottom-10 right-10 hidden md:block">
    <Button href={target}>
      <span className="text-red-300 mr-2 text-4xl leading-none -mb-8 -mt-4">+</span> {label}
    </Button>
  </div>;
}
