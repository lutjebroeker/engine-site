/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Dark mode primary
        void:               '#0D0F17',
        'void-light':       '#121620',
        'void-card':        '#161B2E',
        'void-border':      '#1E2540',
        'void-border-light':'#2A3355',

        // Text
        'off-white':        '#E8E8ED',
        'text-muted':       '#9CA3AF',
        'text-dim':         '#6B7280',

        // Primary accent — warm amber
        amber:              '#F5A623',
        'amber-hover':      '#FBBF24',
        'amber-dim':        '#D4901E',
        'amber-soft':       '#FCD34D',
        'amber-glow':       'rgba(245, 166, 35, 0.15)',

        // Semantic
        success:            '#2AF598', // only for scorecard positive bars / score indicators
        danger:             '#EF4444', // problem-section accents

        // Legacy aliases (kept to avoid breakage in this pass; all migrated to amber)
        charcoal:           '#0D0F17',
        'charcoal-soft':    '#161B2E',
        cream:              '#E8E8ED',
        forest:             '#F5A623',
        'forest-dark':      '#D4901E',
        emerald:            '#F5A623',
        'emerald-dim':      '#D4901E',
        'emerald-glow':     'rgba(245, 166, 35, 0.15)',
        'light-gray':       '#9CA3AF',
        'warm-gray':        '#9CA3AF',
        'amber-warm':       '#F5A623',
        'ee-border':        '#1E2540',
        'ee-border-strong': '#2A3355',
      },
      fontFamily: {
        sans:  ['"Space Grotesk Variable"', '"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono:  ['"JetBrains Mono Variable"', 'monospace'],
      },
      fontSize: {
        display:          ['4.5rem',  { lineHeight: '1.05', letterSpacing: '-0.035em' }],
        'display-mobile': ['2.5rem',  { lineHeight: '1.1',  letterSpacing: '-0.025em' }],
        heading:          ['3rem',    { lineHeight: '1.1',  letterSpacing: '-0.025em' }],
        'heading-mobile': ['2rem',    { lineHeight: '1.2',  letterSpacing: '-0.015em' }],
        subheading:       ['1.75rem', { lineHeight: '1.3' }],
      },
      maxWidth: {
        narrow:  '680px',
        content: '960px',
        wide:    '1200px',
      },
      spacing: {
        section:          '7rem',
        'section-mobile': '4rem',
      },
      animation: {
        'gradient':       'gradient 8s ease infinite',
        'float':          'float 6s ease-in-out infinite',
        'glow-pulse':     'glow-pulse 2s ease-in-out infinite',
        'marquee':        'marquee 30s linear infinite',
        'fade-in':        'fade-in 0.6s ease-out forwards',
        'slide-up':       'slide-up 0.6s ease-out forwards',
        'typewriter':     'typewriter 0.05s steps(1) forwards',
        'border-beam':    'border-beam 4s linear infinite',
        'flip':           'flip 0.6s ease-in-out',
        'shimmer':        'shimmer 2s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(1.5rem)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'border-beam': {
          '0%': { offsetDistance: '0%' },
          '100%': { offsetDistance: '100%' },
        },
        flip: {
          '0%': { transform: 'rotateX(90deg)', opacity: '0' },
          '100%': { transform: 'rotateX(0deg)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
};
