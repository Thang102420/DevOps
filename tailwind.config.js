/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef6ff',
          100: '#d9eaff',
          200: '#bcd9ff',
          300: '#8ec2ff',
          400: '#599eff',
          500: '#2563eb', // Primary royal blue
          600: '#1d4ed8',
          700: '#1e40af',
          800: '#1e3a8a',
          900: '#172554',
          accent: '#f97316', // Orange accent for sales/hot badges
        },
        beige: {
          25: '#FDFCF9',
          50: '#FAF8F5',   // ultra soothing warm cream/beige background
          100: '#F5F0E6',  // soft linen beige
          200: '#EBE3D5',  // warm sand
          300: '#DDD1BF',  // soft latte
          400: '#C7B49B',  // warm taupe
          500: '#A98D71',  // golden camel
          600: '#8E7055',  // warm caramel cognac
          700: '#71553E',  // rich mocha
          800: '#523C2A',  // dark walnut
          900: '#2D2117',  // deep warm espresso
          950: '#1E1610',  // espresso noir
        },
        bronze: {
          50: '#FBF5F0',
          100: '#F6EAE0',
          200: '#ECD5C1',
          300: '#DFBA9B',
          400: '#CF9970',
          500: '#B87B4C',  // classic bronze
          600: '#9E6338',  // deep cognac
          700: '#824E2B',  // roasted terracotta
          800: '#673D22',
          900: '#462816',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 12px 30px -4px rgba(37, 99, 235, 0.12)',
      }
    },
  },
  plugins: [],
}
