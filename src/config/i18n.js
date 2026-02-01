import path from 'node:path'
import { fileURLToPath } from 'node:url'

import i18next from 'i18next'
import Backend from 'i18next-fs-backend'
import middleware from 'i18next-http-middleware'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    preload: ['en', 'vi'],
    // Declare the JSON files you have in the locales folder
    ns: ['auth', 'validation'],
    defaultNS: 'auth', // If no namespace is called, it will look in this file
    backend: {
      // Path will automatically map: lng -> vi/en, ns -> auth/validation/translation
      loadPath: path.join(__dirname, '../locates/{{lng}}/{{ns}}.json'),
    },
    detection: {
      order: ['header', 'querystring', 'cookie'],
      caches: false,
    },
    interpolation: {
      escapeValue: false, // For JSON APIs, escaping HTML characters is not necessary
    },
  })

export default i18next
