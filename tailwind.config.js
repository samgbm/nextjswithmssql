// /** @type {import('tailwindcss').Config} */
// module.exports = {
//     content: [
//         './pages/**/*.{js,ts,jsx,tsx,mdx}',
//         './components/**/*.{js,ts,jsx,tsx,mdx}',
//         './app/**/*.{js,ts,jsx,tsx,mdx}',
//     ],
//     theme: {
//         extend: {},
//     },
//     plugins: [],
// }


/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {},
    },
    // Tailwind v4 doesn't require plugins array by default
    // but you can add it back if you need plugins
}