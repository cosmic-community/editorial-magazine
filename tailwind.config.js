/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        border: 'var(--border)',
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.675rem', { lineHeight: '0.9rem' }], // Scaled from 0.75rem/1rem
        'sm': ['0.7875rem', { lineHeight: '1.125rem' }], // Scaled from 0.875rem/1.25rem
        'base': ['0.9rem', { lineHeight: '1.35rem' }], // Scaled from 1rem/1.5rem
        'lg': ['1.0125rem', { lineHeight: '1.575rem' }], // Scaled from 1.125rem/1.75rem
        'xl': ['1.125rem', { lineHeight: '1.575rem' }], // Scaled from 1.25rem/1.75rem
        '2xl': ['1.35rem', { lineHeight: '1.8rem' }], // Scaled from 1.5rem/2rem
        '3xl': ['1.6875rem', { lineHeight: '2.025rem' }], // Scaled from 1.875rem/2.25rem
        '4xl': ['2.025rem', { lineHeight: '2.25rem' }], // Scaled from 2.25rem/2.5rem
        '5xl': ['2.7rem', { lineHeight: '2.7rem' }], // Scaled from 3rem/3rem
        '6xl': ['3.375rem', { lineHeight: '3.375rem' }], // Scaled from 3.75rem/3.75rem
      },
      spacing: {
        '1': '0.225rem', // Scaled from 0.25rem
        '2': '0.45rem', // Scaled from 0.5rem
        '3': '0.675rem', // Scaled from 0.75rem
        '4': '0.9rem', // Scaled from 1rem
        '5': '1.125rem', // Scaled from 1.25rem
        '6': '1.35rem', // Scaled from 1.5rem
        '7': '1.575rem', // Scaled from 1.75rem
        '8': '1.8rem', // Scaled from 2rem
        '9': '2.025rem', // Scaled from 2.25rem
        '10': '2.25rem', // Scaled from 2.5rem
        '11': '2.475rem', // Scaled from 2.75rem
        '12': '2.7rem', // Scaled from 3rem
        '14': '3.15rem', // Scaled from 3.5rem
        '16': '3.6rem', // Scaled from 4rem
        '20': '4.5rem', // Scaled from 5rem
        '24': '5.4rem', // Scaled from 6rem
        '28': '6.3rem', // Scaled from 7rem
        '32': '7.2rem', // Scaled from 8rem
        '36': '8.1rem', // Scaled from 9rem
        '40': '9rem', // Scaled from 10rem
        '44': '9.9rem', // Scaled from 11rem
        '48': '10.8rem', // Scaled from 12rem
        '52': '11.7rem', // Scaled from 13rem
        '56': '12.6rem', // Scaled from 14rem
        '60': '13.5rem', // Scaled from 15rem
        '64': '14.4rem', // Scaled from 16rem
        '72': '16.2rem', // Scaled from 18rem
        '80': '18rem', // Scaled from 20rem
        '96': '21.6rem', // Scaled from 24rem
      },
      maxWidth: {
        '7xl': '72rem', // Scaled from 80rem
        '6xl': '64.8rem', // Scaled from 72rem
        '5xl': '57.6rem', // Scaled from 64rem
        '4xl': '50.4rem', // Scaled from 56rem
        '3xl': '43.2rem', // Scaled from 48rem
        '2xl': '38.4rem', // Scaled from 42rem
        'xl': '32.4rem', // Scaled from 36rem
        'lg': '28.8rem', // Scaled from 32rem
        'md': '25.2rem', // Scaled from 28rem
        'sm': '21.6rem', // Scaled from 24rem
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(18px)' }, // Scaled from 20px
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}