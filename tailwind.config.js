/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        brand: 'var(--brand)',
        'brand-dark': 'var(--brand-hover)',
        'brand-light': 'var(--brand-soft)',
        swiss: {
          red: 'var(--brand)',
          'red-dark': 'var(--brand-hover)',
          blue: 'var(--blue)'
        },
        pro: {
          DEFAULT: 'var(--pro)',
          light: 'var(--pro-soft)'
        },
        contra: {
          DEFAULT: 'var(--contra)',
          light: 'var(--contra-soft)'
        },
        paper: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-alt': 'var(--surface-alt)',
        ink: {
          DEFAULT: 'var(--text)',
          muted: 'var(--text-muted)',
          subtle: 'var(--text-subtle)'
        },
        border: 'var(--border)',
        'border-light': 'var(--border-light)'
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Source Sans 3"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', '"JetBrains Mono"', 'monospace']
      },
      boxShadow: {
        soft: 'var(--shadow-sm)',
        card: 'var(--shadow-md)',
        lifted: 'var(--shadow-lg)'
      },
      borderRadius: {
        DEFAULT: '8px',
        lg: '16px'
      }
    }
  },
  plugins: []
};
