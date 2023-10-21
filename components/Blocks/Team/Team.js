import Image from 'next/image';
import { buildCMSUrl } from '@/lib/api';
import Markdown from '@/components/Markdown';
import { useTranslation } from 'next-i18next';

export default function Team({ teamMembers }) {
  const { t: tTeam } = useTranslation('team');

  const renderImage = (image) => {
    const { url, alternativeText } = image;
    return (
      <Image
        src={buildCMSUrl(url)}
        layout="fill"
        alt={alternativeText}
        className="grayscale"
        objectFit="cover"
      />
    );
  };

  return teamMembers ? (
    <div className="my-16 mx-8 lg:mx-10 flex flex-col lg:grid lg:grid-cols-3 gap-24 lg:max-w-[1080px]">
      {teamMembers.map((teamMember, tmI) => (
        <div key={tmI}>
          <div className="aspect-square rounded-[50%] relative overflow-hidden max-w-[300px] mx-auto lg:mx-4">
            {renderImage(teamMember.image)}
            <div className="absolute left-0 right-0 top-0 bottom-0 bg-gradient-to-tl from-pink-300 to-yellow-300 mix-blend-multiply"></div>
          </div>
          <h3 className="text-3xl lg:text-2xl lg:text-3xl leading-tight font-bold font-raptor text-pink-300 mt-8">
            {teamMember.name}
          </h3>
          <div className="text-xl lg:text-l leading-tight font-bold font-raptor min-h-[3em] mb-2">
            {teamMember.position}
          </div>
          <div>
            <Markdown isSmall={true} classNames={{ p: 'text-xl lg:text-m' }}>
              {teamMember.text}
            </Markdown>
          </div>
          <div className="text-xl lg:text-s font-bold">{tTeam('contact')}:</div>
          {teamMember.email && (
            <p>
              <a className="text-m lg:text-s underline" href={`mailto:${teamMember.email}`}>
                {teamMember.email}
              </a>
            </p>
          )}
          {teamMember.phone && <p className="text-m lg:text-s">{teamMember.phone}</p>}
        </div>
      ))}
    </div>
  ) : null;
}
