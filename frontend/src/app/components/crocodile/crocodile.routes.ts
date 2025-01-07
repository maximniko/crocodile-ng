import {Routes} from '@angular/router';

const ROUTE_PARTS = {
  crocodile: 'crocodile',
  main: 'main',
  categories: 'categories',
  players: 'players',
}
export const routeCreator = {
  main: () => `/${ROUTE_PARTS.crocodile}/${ROUTE_PARTS.main}`,
  categories: () => `/${ROUTE_PARTS.crocodile}/${ROUTE_PARTS.categories}`,
  players: () => `/${ROUTE_PARTS.crocodile}/${ROUTE_PARTS.players}`,
}

export const crocodileRoutes: Routes = [
  {
    path: ROUTE_PARTS.crocodile,
    children: [
      {
        path: ROUTE_PARTS.main,
        loadComponent: () => import('./components/main/main.component').then(mod => mod.MainComponent)
      },
      {
        path: ROUTE_PARTS.categories,
        loadComponent: () => import('./components/categories/categories.component').then(mod => mod.CategoriesComponent)
      },
      {
        path: ROUTE_PARTS.players,
        loadComponent: () => import('./components/players/players.component').then(mod => mod.PlayersComponent)
      },
      {path: '**', redirectTo: routeCreator.main(), pathMatch: 'full'},
    ],
  },
  {path: '**', redirectTo: routeCreator.main(), pathMatch: 'full'},
]
