import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';

import { PagesModule } from './pages/pages.module';
import { CharactersModule } from './characters/characters.module';
import { ComicsModule } from './comics/comics.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PagesModule,
    CharactersModule,
    ComicsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
