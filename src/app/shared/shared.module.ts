import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { HeaderComponent } from "./header/header.component";
import { ButtonComponent } from './button/button.component';
import { SearchFilterPipe } from './search-filter.pipe';


@NgModule({
	imports: [
		CommonModule,
		RouterModule
	],
	declarations: [
		HeaderComponent,
		ButtonComponent,
		SearchFilterPipe
	],
	exports: [
		HeaderComponent,
		ButtonComponent,
		SearchFilterPipe
	]
})

export class SharedModule { }