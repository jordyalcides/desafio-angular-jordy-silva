import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CharacterDetailComponent } from "./character-detail/character-detail.component";
import { CharacterComponent } from "./character/character.component";
import { CharactersListComponent } from "./characters-list/characters-list.component";

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		CharacterComponent,
		CharactersListComponent,
		CharacterDetailComponent
	],
	exports: [
		CharacterComponent,
		CharactersListComponent,
		CharacterDetailComponent
	]
})

export class CharactersModule { }