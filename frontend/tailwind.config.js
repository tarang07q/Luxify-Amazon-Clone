/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366F1', /* Indigo-500 */
          dark: '#4F46E5',    /* Indigo-600 */
          light: '#818CF8',   /* Indigo-400 */
        },
        secondary: {
          DEFAULT: '#1E293B', /* Slate-800 */
          dark: '#0F172A',    /* Slate-900 */
          light: '#334155',   /* Slate-700 */
        },
        accent: {
          DEFAULT: '#EC4899', /* Pink-500 */
          dark: '#DB2777',    /* Pink-600 */
          light: '#F472B6',   /* Pink-400 */
        },
        success: {
          DEFAULT: '#10B981', /* Emerald-500 */
          light: '#34D399',   /* Emerald-400 */
          dark: '#059669',    /* Emerald-600 */
        },
      },
    },
  },
  plugins: [],
}
