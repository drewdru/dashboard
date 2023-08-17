/** @type {import('tailwindcss').Config} */
require('dotenv').config();
const enablePurge = process.env.ENABLE_PURGE || true;
module.exports = {
  important: true,
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
  purge: {
    enabled: enablePurge,
    content: [
      './src/**/*.html',
      './src/**/*.scss'
    ]
  },
}

