import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        drivers: 'Drivers',
        live: 'Live',
      },
      home: {
        title: 'F1 Insights Dashboard',
        description: 'Season overviews, driver form, and live telemetry simulation.',
      },
      drivers: {
        title: 'Drivers',
        searchPlaceholder: 'Search drivers…',
      },
      live: {
        title: 'Live Timing',
        description: 'Simulated telemetry stream powered by OpenF1 adapter fallback.',
      },
    },
  },
  he: {
    translation: {
      nav: {
        home: 'בית',
        drivers: 'נהגים',
        live: 'חי',
      },
      home: {
        title: 'לוח מחוונים של F1',
        description: 'סקירות עונה, כושר נהגים וטלמטריה חיה סימולטיבית.',
      },
      drivers: {
        title: 'נהגים',
        searchPlaceholder: 'חיפוש נהגים…',
      },
      live: {
        title: 'זמן אמת',
        description: 'זרם טלמטריה מדומה המונע על ידי OpenF1.',
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('locale') ?? 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

document.documentElement.dir = i18n.language === 'he' ? 'rtl' : 'ltr';

i18n.on('languageChanged', (lng) => {
  document.documentElement.dir = lng === 'he' ? 'rtl' : 'ltr';
});

export { i18n };
