/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                roboto: "var(--font-roboto)",
            },
            colors: {
                primary: "var(--color-primary)",
                secondary: "var(--color-secondary)",
                accent: "var(--color-accent)",
                neutral: {
                    light: "var(--color-neutral-light)",
                    DEFAULT: "var(--color-neutral)",
                    dark: "var(--color-neutral-dark)",
                },
            },
        },
    },
    plugins: [],
};
