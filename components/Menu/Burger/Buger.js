import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

export default function Burger({ onOpen = () => {}, onClose = () => {}, className }) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();

        if (isOpen) {
          onClose();
        } else {
          onOpen();
        }

        setIsOpen(!isOpen);
      }}
      className={clsx(className)}>
      {t(`menu.burger.${isOpen ? 'close' : 'open'}`)}
    </button>
  );
}
