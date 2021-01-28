import { useState } from 'react';
import Link from 'next/link';

import NavigationSecondary from '../NavigationSecondary';

import * as styles from './header.styles';

const Logo = () => (
  <div css={styles.logoContainer}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="70"
      height="70"
      viewBox="0 0 70 70"
      css={styles.logo}>
      <path
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="2.5"
        d="M9 35H0M25 35H14M56 35H45M70 35h-9M35 9V0M35 25V14M35 56V45M35 70v-9M16 16l-6-6M28 28l-7-7M49 49l-7-7M60 60l-6-6M54 16l6-6M42 28l7-7M21 49l7-7M10 60l6-6"
      />
    </svg>
  </div>
);

const Burger = (props) => (
  <button type="button" css={styles.burger} {...props}>
    <svg width="32" height="17" viewBox="0 0 32 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path stroke="currentColor" strokeWidth="2" d="M32 .9H0M32 7.9H0M32 15.9H0" />
    </svg>
  </button>
);

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header css={styles.header}>
      <Link href="/">
        <a css={styles.logoLink}>
          <Logo />
          Moving Cities Map
        </a>
      </Link>

      <Burger onClick={() => setIsOpen(!isOpen)} />
      <NavigationSecondary isOpen={isOpen} />
    </header>
  );
};

export default Header;
