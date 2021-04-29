import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { HeaderComponent } from "./header/header.component";
import { CharactersModule } from "../characters/characters.module";
import { CharactersListComponent } from './characters-list/characters-list.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { ComicsListComponent } from './comics-list/comics-list.component';
import { ComicsModule } from "../comics/comics.module";
import { ComicDetailComponent } from './comic-detail/comic-detail.component';


@NgModule({
	imports: [
		CommonModule,
		CharactersModule,
		ComicsModule
	],
	declarations: [
		HeaderComponent,
		CharactersListComponent,
		CharacterDetailComponent,
		ComicsListComponent,
		ComicDetailComponent
	],
	exports: [
		HeaderComponent
	]
})

export class PagesModule { }