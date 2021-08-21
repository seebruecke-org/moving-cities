import { useTranslation } from "next-i18next";
import { useState } from "react";
import Link from 'next/link';

export default function CountryPreview({ cities }) {
  const { t: tSlugs } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ul className="bg-yellow-300 h-full overflow-y-auto flex flex-col">
      {cities.map(({ name, networks }) => (
        <li className="border-b border-grey-300">
          {name}

          {networks?.length > 0 && (
            <>
              <button type="button" onClick={() => setIsOpen(!isOpen)}>
                Toggle
              </button>

              {isOpen && (
                <ul>
                  {networks.map(({ name: networkName, slug }) => (
                    <li>
                      <Link href={`/${tSlugs('networks')}/${slug}`}>
                        <a>
                          {networkName}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
