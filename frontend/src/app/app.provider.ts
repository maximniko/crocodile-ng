import {
  EnvironmentProviders, inject, provideAppInitializer,
  Provider,
  provideZoneChangeDetection
} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {appRoutesProvider} from './app.routes.provider';
import {provideHttpClient, withFetch, withInterceptorsFromDi} from '@angular/common/http';
import {crocodileProviders} from './components/crocodile/crocodile.provider';
import {firstValueFrom} from 'rxjs';
import {CategoriesService} from './components/crocodile/services/categories/categories.service';
import {Localisation} from './services/localisation';

export const providers: Array<Provider | EnvironmentProviders> = [
  provideZoneChangeDetection({eventCoalescing: true}),
  provideRouter(routes),
  appRoutesProvider,
  provideHttpClient(withFetch(), withInterceptorsFromDi()),
  ...crocodileProviders,
  provideAppInitializer(() => {
    return firstValueFrom(inject(CategoriesService).categoriesSubject);
  }),
  provideAppInitializer(() => {
    return firstValueFrom(inject(Localisation).loaded);
  }),
];
