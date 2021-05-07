import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComicDetailComponent } from './comic-detail/comic-detail.component';
import { ComicsListComponent } from './comics-list/comics-list.component';

const routes: Routes = [
  { path: 'comics/:id', component: ComicDetailComponent },
  {
    path: 'comics',
    component: ComicsListComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ComicsRoutingModule { }
