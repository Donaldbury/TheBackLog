import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import fa from './locales/fa.json';
import fr from './locales/fr.json';
import nl from './locales/nl.json';
import de from './locales/de.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            fa: { translation: fa },
            fr: { translation: fr },
            nl: { translation: nl },
            de: { translation: de }
        },
        lng: 'en', // Default language
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false // React already escapes values
        }
    });

export default i18n;
