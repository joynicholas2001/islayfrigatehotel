/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#C5A059',
                'primary-hover': '#AB8A4B',
                secondary: '#1A1A1A',
                accent: '#F9F7F2',
                'background-light': '#FFFFFF',
                'background-dark': '#121212',
                'text-dark': '#1A1A1A',
                'text-light': '#E5E5E5',
                'text-muted': '#717171',
            },
            fontFamily: {
                serif: ["Playfair Display", "serif"],
                sans: ["Inter", "sans-serif"],
            },
        },
    },
    plugins: [],
}
