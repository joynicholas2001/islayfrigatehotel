/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#C5A059',
                    hover: '#AB8A4B',
                },
                secondary: {
                    DEFAULT: '#001F3F',
                    light: '#003366',
                },
                accent: '#F9F7F2',
            },
            fontFamily: {
                serif: ['var(--font-playfair)', 'serif'],
                sans: ['var(--font-inter)', 'sans-serif'],
            },
            transitionProperty: {
                'luxury': 'all',
            },
            transitionTimingFunction: {
                'luxury': 'cubic-bezier(0.4, 0, 0.2, 1)',
            },
        },
    },
    plugins: [],
}
