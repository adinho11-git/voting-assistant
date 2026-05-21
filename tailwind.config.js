/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        brand: '#C8102E',
        'brand-dark': '#8B0A1E',
        'brand-light': '#FFF0F2',
        swiss: {
          red: '#C8102E',
          'red-dark': '#8B0A1E',
          blue: '#003087'
        },
        pro: {
          DEFAULT: '#065F46',
          light: '#ECFDF5'
        },
        contra: {
          DEFAULT: '#991B1B',
          light: '#FEF2F2'
        },
        paper: '#F7F6F2',
        surface: '#FFFFFF',
        'surface-alt': '#EFEDE7',
        ink: {
          DEFAULT: '#1A1A1A',
          muted: '#6B6B6B',
          subtle: '#9A9A9A'
        },
        border: '#D4D0C8',
        'border-light': '#E8E5DE'
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Source Sans 3"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', '"JetBrains Mono"', 'monospace']
      },
      boxShadow: {
        soft: '0 1px 3px rgba(0,0,0,0.06)',
        card: '0 4px 16px rgba(0,0,0,0.08)',
        lifted: '0 20px 48px rgba(0,0,0,0.12)'
      },
      borderRadius: {
        DEFAULT: '8px',
        lg: '16px'
      }
    }
  },
  plugins: []
};
