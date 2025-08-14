/** @type {import('tailwindcss').Config} */
export const content = [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
    extend: {
        colors: {
            background: "#121212",
            foreground: "#e0e0e0",
            card: "#1e1e1e",
            border: "#2c2c2c",
            muted: "#2a2a2a",
            accent: {
                DEFAULT: "#ff6b35",
                hover: "#ff814f",
            },
            "text-secondary": "#b3b3b3",
        },
        boxShadow: {
            'card': '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
            'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
        },
    },
};
export const plugins = [];
