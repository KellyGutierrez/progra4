import { Routes, RouterModule } from '@angular/router';

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
  {
    path: 'page',
    loadChildren: () => import('../../page/page.module').then(m => m.PageModule)
  },

  {
    path:'exercises',
    loadChildren: () => import('../../exercises/exercises.module')
    .then(m => m.ExercisesModule)
  }
];
