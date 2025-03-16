import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    ns: ['translations'],
    defaultNS: 'translations',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translations: {
          'features.title': 'Completed Projects',
          'features.text': "Here's a brief list of projects I've worked on.",
          'features.item1.description': 'Worked on TurboTax and QuickBooks...',
          'features.item2.description': 'Worked on RBC Mobile Banking App...',
          'features.item3.description': 'Worked on Rogers Technical Support Console...',
          'features.item4.description': 'Enhanced the NCR Teller Application...',
          'testimonials.title': 'Testimonials',
          'testimonials.text': 'What others say about working with me.',
        },
      },
    },
  });

export default i18n; 