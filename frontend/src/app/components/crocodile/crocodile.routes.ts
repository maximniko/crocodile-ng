import {Routes} from '@angular/router';

const ROUTE_PARTS = {
  croco: 'croco',
  main: 'main',
  categories: 'categories',
  players: 'players',
  game: 'game',
}
export const routeCreator = {
  main: () => `/${ROUTE_PARTS.croco}/${ROUTE_PARTS.main}`,
  categories: () => `/${ROUTE_PARTS.croco}/${ROUTE_PARTS.categories}`,
  players: () => `/${ROUTE_PARTS.croco}/${ROUTE_PARTS.players}`,
  game: () => `/${ROUTE_PARTS.croco}/${ROUTE_PARTS.game}`,
}

export const crocodileRoutes: Routes = [
  {
    path: ROUTE_PARTS.croco,
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
      {
        path: ROUTE_PARTS.game,
        loadComponent: () => import('./components/game/game.component').then(mod => mod.GameComponent)
      },
      {path: '**', redirectTo: routeCreator.main(), pathMatch: 'full'},
    ],
  },
  {path: '**', redirectTo: routeCreator.main(), pathMatch: 'full'},
]
