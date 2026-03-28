/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream:              '#FDFBF7',
        sand:               '#F5F0E8',
        charcoal:           '#1C1917',
        'charcoal-soft':    '#292524',
        forest:             '#2D5A3D',
        'forest-dark':      '#1E3F2B',
        'forest-light':     '#E8F0EB',
        sage:               '#4A7C5C',
        amber:              '#B45309',
        'amber-light':      '#FEF3C7',
        'amber-warm':       '#D97706',
        'warm-gray':        '#57534E',
        'light-gray':       '#A8A29E',
        'ee-border':        '#E7E5E4',
        'ee-border-strong': '#D6D3D1',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:  ['"Inter"', 'system-ui', 'sans-serif'],
        mono:  ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        display:          ['3.5rem',  { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-mobile': ['2.25rem', { lineHeight: '1.2',  letterSpacing: '-0.02em' }],
        heading:          ['2.5rem',  { lineHeight: '1.2',  letterSpacing: '-0.01em' }],
        'heading-mobile': ['1.75rem', { lineHeight: '1.25' }],
        subheading:       ['1.75rem', { lineHeight: '1.3'  }],
      },
      maxWidth: {
        narrow:  '680px',
        content: '960px',
        wide:    '1200px',
      },
      spacing: {
        section:        '6rem',
        'section-mobile': '3.5rem',
      },
    },
  },
};
