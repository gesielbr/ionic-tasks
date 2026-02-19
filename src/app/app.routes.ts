import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'characters',
    loadChildren: () =>
      import('./features/characters/pages/characters/characters.routes').then(
        (m) => m.CHARACTERS_ROUTES,
      ),
  },
];
