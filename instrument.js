import * as Sentry from '@sentry/node'

import ApiError from './src/utils/ApiError.js'
import 'dotenv/config'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  sendDefaultPii: true,

  beforeSend(event, hint) {
    const error = hint.originalException

    if (error instanceof ApiError && error.statusCode < 500) {
      return null
    }

    return event
  },
})
