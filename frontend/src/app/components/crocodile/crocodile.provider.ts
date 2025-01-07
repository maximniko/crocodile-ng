import {EnvironmentProviders, Provider} from '@angular/core';
import {environment} from '../../../environments/environment';
import {CategoriesService} from './services/categories/categories.service';
import {CategoriesDevService} from './services/categories/categories-dev.service';

export const crocodileProviders: Array<Provider | EnvironmentProviders> = [
  {
    provide: CategoriesService,
    useClass: environment.production ? CategoriesService : CategoriesDevService
  },
]
