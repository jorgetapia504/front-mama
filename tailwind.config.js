/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [],
  theme: {
    fontFamily: {
      'poppins': ['poppins', 'system-ui', 'sans-serif'],
      'montserrat': ['montserrat', 'system-ui', 'sans-serif']
    }
  }
}
