import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComicComponent } from './comic/comic.component';
import { ComicsListComponent } from './comics-list/comics-list.component';
import { ComicDetailComponent } from './comic-detail/comic-detail.component';
import { ComicsRoutingModule } from './comics-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ComicsRoutingModule
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
