import { Routes } from '@angular/router';

export const CHARACTERS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./characters.page').then((m) => m.CharactersPage),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('../character-detail/character-detail.page').then(
        (m) => m.CharacterDetailPage,
      ),
  },
];
