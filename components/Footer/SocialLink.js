import Image from 'next/image';

export default function SocialLink({ url, logo }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="mr-4 hover:invert block w-[25px] h-[25px]"
    >
      <Image src={logo} priority height={25} width={25} />
    </a>
  );
}
