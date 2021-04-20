import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				RouterTestingModule
			],
			declarations: [
				HeaderComponent
			],
		}).compileComponents();
	});

	it('should create the header', () => {
		const fixture = TestBed.createComponent(HeaderComponent);
		const header = fixture.componentInstance;
		expect(header).toBeTruthy();
	});

	it(`should have as image 'Marvel'`, () => {
		const fixture = TestBed.createComponent(HeaderComponent);
		const header = fixture.componentInstance;
		expect(header.homeimg).toEqual('assets/svg/marvel.svg');
	});

	it('should render buttons', () => {
		const fixture = TestBed.createComponent(HeaderComponent);
		fixture.detectChanges();
		const compiled = fixture.nativeElement;
		expect(compiled.querySelector('.headerButtons a button').textContent).toBeTruthy();
	});
});
