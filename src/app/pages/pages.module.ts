import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { HeaderComponent } from "./header/header.component";
import { CharactersModule } from "../characters/characters.module";
import { CharactersListComponent } from './characters-list/characters-list.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';


@NgModule({
	imports: [
		CommonModule,
		CharactersModule
	],
	declarations: [
		HeaderComponent,
		CharactersListComponent,
		CharacterDetailComponent
	],
	exports: [
		HeaderComponent
	]
})

export class PagesModule { }