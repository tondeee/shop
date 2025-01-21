import env from '../config/env';
// Removed import of settingsSlice
import baseApi from '@/shared/store/api';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: env.SENTRY_DSN,
  release: env.VERSION,
  enabled: !env.IS_DEV,
  environment: env.NODE_ENV,
  tracesSampleRate: 0.1,
  attachStacktrace: true,
  integrations: [Sentry.replayIntegration()],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
});

const sentryReduxEnhancer = Sentry.createReduxEnhancer();

export const rootReducer = combineReducers({
  api: baseApi.reducer,

});

export const storeConfig = {
  reducer: rootReducer,
  devTools: env.IS_DEV,
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers().prepend(sentryReduxEnhancer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(
      baseApi.middleware,
    ),
};

export const store = configureStore(storeConfig);
