module.exports = {
  mode: 'jit',
  darkMode: false,
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    colors: {
      yellow: {
        300: '#FAF11A'
      },

      pink: {
        300: '#F94AE7'
      },

      red: {
        300: '#F55511'
      },

      grey: {
        300: '#E1E1E1'
      },

      white: '#FFFFFF',
      black: '#000000'
    },

    fontFamily: {
      raptor: ['Raptor', 'sans-serif'],
      rubik: ['Rubik']
    },

    fontSize: {
      '6xl': '12rem',
      '5xl': '6.4rem',
      '4xl': '4.8rem',
      '3xl': '3.6rem',
      '2xl': '3rem',
      xl: '2.4rem',
      l: '2.1rem',
      m: '1.8rem',
      s: '1.6rem',
      xs: '1.4rem',
      '2xs': '1.2rem'
    },

    extend: {
      maxWidth: {
        '8xl': '115rem',
        '1/2': '50%',
      }
    }
  },
  variants: {},
  plugins: []
};
