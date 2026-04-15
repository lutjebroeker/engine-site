export const config = {
  pricing: {
    tiers: [
      {
        id: 'starter',
        name: 'Starter',
        price: '€47',
        priceSuffix: '/mo',
        tagline: 'Eén module. Eén connector.',
        modules: '1 naar keuze',
        connectors: '1 connector',
        features: [
          'Kies 1 module: Execute, Create of Learn',
          '1 connector (Obsidian, Notion, Apple Notes…)',
          'Volledig geheugen',
          '14 dagen gratis trial',
          'Opzeggen met één klik',
        ],
        highlighted: false,
      },
      {
        id: 'growth',
        name: 'Growth',
        price: '€97',
        priceSuffix: '/mo',
        tagline: 'Twee modules + cross-module synergie.',
        modules: '2 modules + cross-module',
        connectors: '2 connectors',
        features: [
          'Kies 2 modules + ze versterken elkaar',
          '2 connectors',
          'Volledig geheugen + patroonherkenning',
          '14 dagen gratis trial',
          'Opzeggen met één klik',
        ],
        highlighted: true,
        badge: 'Aanbevolen',
      },
      {
        id: 'full',
        name: 'Full Engine',
        price: '€197',
        priceSuffix: '/mo',
        tagline: 'Alle drie. Met coaching.',
        modules: 'Execute + Create + Learn',
        connectors: 'Unlimited connectors',
        features: [
          'Alle drie de modules',
          'Unlimited connectors',
          'Het volle vliegwiel',
          'Onboarding call + coaching',
          '14 dagen gratis trial',
        ],
        highlighted: false,
      },
    ],
    trialDays: 14,
  },
  urls: {
    scorecard: '/score',
    trial: '/start',
    pdfChapter1: '#', // stub — drop hoofdstuk-1.pdf in /public later and update
    linkedin: 'https://www.linkedin.com/in/jellespek/',
  },
  scorecard: {
    webhookUrl: 'https://n8n.jellespek.nl/webhook/score-submission',
  },
  trial: {
    webhookUrl: 'https://n8n.jellespek.nl/webhook/trial-signup',
  },
  meta: {
    title: 'Engine Platform — Je persoonlijk geheugen, werkend gemaakt',
    description: 'Eén systeem dat je content maakt, je kennis scherp houdt, en je confronteert met je eigen execution. Schrijf waar je wilt — het systeem doet de rest.',
    ogImage: '/og-image.svg',
    url: 'https://engine-platform.com',
  },
};
