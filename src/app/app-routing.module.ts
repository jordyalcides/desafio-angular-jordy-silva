import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersListComponent } from './pages/characters-list/characters-list.component';
import { CharacterDetailComponent } from './pages/character-detail/character-detail.component';

const routes: Routes = [
  { path: 'characters/:id', component: CharacterDetailComponent },
  {
    path: 'characters',
    component: CharactersListComponent,
    data: { title: 'Characters List' }
  },
  {
    path: '',
    redirectTo: '/characters',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
