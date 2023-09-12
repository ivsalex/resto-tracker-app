/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx,jsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['ClashDisplay-Regular', ...defaultTheme.fontFamily.sans],
            },
            focusRing: {
                marigold: '#ffbe0b'
            },
            colors: {
                tomato: '#E50914',
                marigold: {
                    500: '#ffbe0b',
                    600: '#f59e0b'
                },
                available: {
                    500: '#32CD32',
                    600: '#22c55e'
                },
                unavailable: '#E50914',
                zinc: {
                    200: '#e4e4e7',
                    400: '#a1a1aa',
                    500: '#71717a'
                },
                lime: {
                    500: '#10b981'
                }
            },
            backgroundImage: {
                'background': "url('./assets/images/home_background.png')",
            }
        },
    },
    plugins: [],
};