import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterDetailComponent } from "./character-detail/character-detail.component";
import { CharactersListComponent } from "./characters-list/characters-list.component";

const routes: Routes = [
	{ path: 'characters/:id', component: CharacterDetailComponent },
	{
		path: 'characters',
		component: CharactersListComponent,
		data: { title: 'Characters List' }
	}
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class CharactersRoutingModule { }
