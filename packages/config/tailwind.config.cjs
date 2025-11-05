const plugin = require('tailwindcss/plugin');

module.exports = {
  darkMode: ['class'],
  content: [
    '../../apps/web/index.html',
    '../../apps/web/src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-bg)',
        foreground: 'var(--color-fg)',
        accent: 'var(--color-accent)'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    plugin(function ({ addVariant }) {
      addVariant('rtl', '&[dir="rtl"] &');
    })
  ]
};
