/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#E30A17',
        secondary: '#1B2A4A',
        'visa-free': '#16A34A',
        'visa-free-bg': '#F0FDF4',
        'visa-on-arrival': '#D97706',
        'visa-on-arrival-bg': '#FFFBEB',
        'e-visa': '#2563EB',
        'e-visa-bg': '#EFF6FF',
        'visa-required': '#DC2626',
        'visa-required-bg': '#FEF2F2',
        'no-admission': '#6B7280',
        'no-admission-bg': '#F3F4F6',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
