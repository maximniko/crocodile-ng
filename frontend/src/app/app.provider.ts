import {EnvironmentProviders, Provider, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {appRoutesProvider} from './app.routes.provider';
import {provideHttpClient, withFetch, withInterceptorsFromDi} from '@angular/common/http';
// import {provideClientHydration} from '@angular/platform-browser';
import {crocodileProviders} from './components/crocodile/crocodile.provider';

export const providers: Array<Provider | EnvironmentProviders> = [
  provideZoneChangeDetection({eventCoalescing: true}),
  provideRouter(routes),
  appRoutesProvider,
  // provideClientHydration(),
  provideHttpClient(withFetch(), withInterceptorsFromDi()),
  ...crocodileProviders,
];
