import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

export default function Burger({ onOpen = () => {}, onClose = () => {}, className }) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button
      type="button"
      aria-label={t(`menu.burger.${isOpen ? 'close' : 'open'}`)}
      onClick={(event) => {
        event.preventDefault();

        if (isOpen) {
          onClose();
        } else {
          onOpen();
        }

        setIsOpen(!isOpen);
      }}
      className={clsx('hover:text-black', className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="52"
        height="41"
        viewBox="0 0 52 41"
        className="w-16 h-auto -ml-1">
        <g stroke="currentColor" stroke-linecap="round" stroke-width="3" filter="url(#filter0_d)">
          <path d="M7.5 20.5h29M7.5 29.5h29M7.5 11.5h29" />
        </g>

        <defs>
          <filter
            id="filter0_d"
            width="52"
            height="41"
            x="0"
            y="0"
            color-interpolation-filters="sRGB"
            filterUnits="userSpaceOnUse">
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dx="4" />
            <feGaussianBlur stdDeviation="5" />
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
            <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
          </filter>
        </defs>
      </svg>
    </button>
  );
}
