import { useState } from 'react';
import Link from 'next/link';

import NavigationSecondary from '../NavigationSecondary';

import * as styles from './header.styles';

const Logo = () => (
  <div css={styles.logoContainer}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" css={styles.logo}>
      <path d="M45.6 96.7h27.5v6.6H45.6zM126.9 96.7h27.5v6.6h-27.5zM96.7 126.9h6.6v27.5h-6.6zM96.7 45.6h6.6v27.5h-6.6zM59.2 63.8l4.7-4.6 19.4 19.4-4.6 4.7zM116.7 121.3l4.7-4.6 19.4 19.4-4.6 4.7zM59.2 136.2l19.5-19.5 4.6 4.7L64 140.8zM116.7 78.7l19.5-19.5 4.6 4.7-19.4 19.4z" />

      <g className="outer">
        <path d="M167.6 96.7h27.5v6.6h-27.5zM4.9 96.7h27.5v6.6H4.9zM96.7 4.9h6.6v27.5h-6.6zM96.7 167.6h6.6v27.5h-6.6zM145.4 150l4.7-4.6 19.4 19.5-4.7 4.6zM30.4 35l4.7-4.6 19.4 19.4-4.6 4.7zM145.4 50L165 30.4l4.6 4.7-19.4 19.4zM30.4 165l19.4-19.5 4.7 4.6-19.4 19.5z" />
      </g>
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
