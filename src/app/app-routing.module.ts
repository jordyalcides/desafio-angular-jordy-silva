import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComicsListComponent } from './comics/comics-list/comics-list.component';
import { ComicDetailComponent } from './comics/comic-detail/comic-detail.component';

const routes: Routes = [
  { path: 'comics/:id', component: ComicDetailComponent },
  {
    path: 'comics',
    component: ComicsListComponent,
    data: { title: 'Comics List' }
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
