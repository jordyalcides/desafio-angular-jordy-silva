import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComicComponent } from './comic/comic.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ComicComponent
  ],
  exports: [
    ComicComponent
  ]
})
export class ComicsModule { }
