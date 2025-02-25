import {Routes} from '@angular/router';

const ROUTE_PARTS = {
  crocodile: 'crocodile',
  main: 'main',
  howToPlay: 'how-to-play',
  categories: 'categories',
  players: 'players',
  game: 'game',
}
export const routeCreator = {
  main: () => `/${ROUTE_PARTS.crocodile}/${ROUTE_PARTS.main}`,
  howToPlay: () => `/${ROUTE_PARTS.crocodile}/${ROUTE_PARTS.howToPlay}`,
  categories: () => `/${ROUTE_PARTS.crocodile}/${ROUTE_PARTS.categories}`,
  players: () => `/${ROUTE_PARTS.crocodile}/${ROUTE_PARTS.players}`,
  game: () => `/${ROUTE_PARTS.crocodile}/${ROUTE_PARTS.game}`,
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
        path: ROUTE_PARTS.howToPlay,
        loadComponent: () => import('./components/how-to-play.component').then(mod => mod.HowToPlayComponent)
      },
      {
        path: ROUTE_PARTS.players,
        loadComponent: () => import('./components/players/players.component').then(mod => mod.PlayersComponent)
      },
      // {
      //   path: ROUTE_PARTS.categories,
      //   loadComponent: () => import('./components/categories/categories.component').then(mod => mod.CategoriesComponent)
      // },
      {
        path: ROUTE_PARTS.game,
        loadComponent: () => import('./components/game/game.component').then(mod => mod.GameComponent)
      },
      {path: '**', redirectTo: routeCreator.main(), pathMatch: 'full'},
    ],
  },
  {path: '**', redirectTo: routeCreator.main(), pathMatch: 'full'},
]
