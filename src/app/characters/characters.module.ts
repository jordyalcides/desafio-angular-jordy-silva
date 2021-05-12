import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CharactersRoutingModule } from "./characters-routing.module";
import { CharactersListComponent } from "./characters-list/characters-list.component";
import { CharacterDetailComponent } from "./character-detail/character-detail.component";
import { CharacterComponent } from "./character/character.component";
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms";


@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		FormsModule,
		CharactersRoutingModule
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