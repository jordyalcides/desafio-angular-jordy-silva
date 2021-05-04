import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComicComponent } from './comic/comic.component';
import { ComicsListComponent } from './comics-list/comics-list.component';
import { ComicDetailComponent } from './comic-detail/comic-detail.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ComicComponent,
    ComicsListComponent,
    ComicDetailComponent
  ],
  exports: [
    ComicComponent,
    ComicsListComponent,
    ComicDetailComponent
  ]
})
export class ComicsModule { }
