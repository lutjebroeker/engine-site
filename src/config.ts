export const config = {
  founding: {
    totalSpots: 12,
    spotsRemaining: 12, // UPDATE THIS MANUALLY AS SPOTS FILL
    price: '€997',
    regularPrice: '€2,497',
  },
  urls: {
    scorecard: '/score',
    bookCall: '#',            // TODO: Calendly/Cal.com URL
    linkedin: 'https://www.linkedin.com/in/jellespek/',
  },
  scorecard: {
    webhookUrl: 'https://n8n.jellespek.nl/webhook/score-submission',
  },
  meta: {
    title: 'Execution Engine — From knowing to doing.',
    description: 'A done-for-you AI accountability system that measures what you do vs. what you said. 12 weeks. 85%+ execution rate. Founding members: €997.',
    ogImage: '/og-image.svg',
    url: 'https://execution-engine.com',
  },
};
