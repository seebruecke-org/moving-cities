import Button from '@/components/Button';

export default function FloatingCta({ target, label }) {
  return (
    <div className="fixed bottom-10 right-10 hidden md:block">
      <Button href={target}>
        <span className="text-red-300 mr-4 text-2xl relative h-11">+</span>
        <span>{label}</span>
      </Button>
    </div>
  );
}
