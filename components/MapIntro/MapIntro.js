import { useWindowSize } from 'react-use';
import Modal from 'react-modal';

import * as styles from './mapIntro.styles';

export default function MapIntro({ children, isOpen = false, onClose = () => {} }) {
  const { width: windowWidth } = useWindowSize();
  const isDesktop = windowWidth > 768;

  return (
    <Modal
      isOpen={isOpen}
      style={{
        overlay: styles.overlay,
        content: {
          ...styles.content,

          borderRadius: isDesktop ? '50%' : '2rem',
          fontSize: isDesktop ? '2.1rem' : '1.75rem',
          height: isDesktop ? '66rem' : 'auto',
          inset: isDesktop ? '4rem' : '1.5rem',
          padding: isDesktop ? '10rem' : '2rem',
          position: isDesktop ? 'static' : 'absolute',
          textAlign: isDesktop ? 'center' : 'left',
          width: isDesktop ? '66rem' : 'auto'
        }
      }}>
      <button type="button" onClick={() => onClose()} css={styles.close}>
        <svg
          width="29"
          height="27"
          viewBox="0 0 29 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path stroke="currentColor" strokeWidth="2" d="M27.7.7l-25 25M26.3 25.7L1.3.7" />
        </svg>
      </button>

      {children}

      <button type="button" onClick={() => onClose()} css={styles.cta}>
        Lets go!
        <svg
          width="34"
          height="24"
          viewBox="0 0 34 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          css={styles.ctaIcon}>
          <path
            stroke="currentColor"
            strokeWidth="2"
            d="M20.6 23.1l11.7-11.7M21 1l11.8 11.7M32.1 12.1H0"
          />
        </svg>
      </button>
    </Modal>
  );
}
