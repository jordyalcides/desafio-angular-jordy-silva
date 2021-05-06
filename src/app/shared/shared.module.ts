import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { HeaderComponent } from "./header/header.component";
import { ButtonComponent } from './button/button.component';


@NgModule({
	imports: [
		CommonModule,
		RouterModule
	],
	declarations: [
		HeaderComponent,
		ButtonComponent
	],
	exports: [
		HeaderComponent,
		ButtonComponent
	]
})

export class SharedModule { }