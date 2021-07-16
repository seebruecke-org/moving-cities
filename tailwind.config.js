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
      raptor: ['Raptor V3'],
      rubik: ['Rubik']
    },

    fontSize: {
      '6xl': '7.5rem',
      '5xl': '4rem',
      '4xl': '3rem',
      '3xl': '2.25rem',
      '2xl': '1.875rem',
      xl: '1.5rem',
      l: '1.31rem',
      m: '1.13rem',
      s: '1rem',
      xs: '0.875rem',
      '2xs': '0.75rem'
    },

    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
