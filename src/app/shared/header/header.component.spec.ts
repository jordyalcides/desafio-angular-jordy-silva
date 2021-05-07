import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { HeaderComponent } from './header.component'

describe('HeaderComponent', () => {
	let header: HeaderComponent
	let fixture: ComponentFixture<HeaderComponent>
	let compiled: any

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				RouterTestingModule
			],
			declarations: [
				HeaderComponent
			],
		})
			.compileComponents()
	})

	beforeEach(() => {
		fixture = TestBed.createComponent(HeaderComponent)
		header = fixture.componentInstance

		header.buttons = [
			{
				name: 'myCharacters',
				link: {
					type: 'internal',
					url: '/characters'
				}
			},
			{
				name: 'myComics',
				link: {
					type: 'internal',
					url: '/comics'
				}
			}
		]

		fixture.detectChanges()
		compiled = fixture.nativeElement
	})

	it('should create the header', () => {
		expect(header).toBeTruthy()
	})

	it(`should have as image 'Marvel'`, () => {
		expect(compiled.querySelector('h1 img').getAttribute('src')).toEqual('assets/svg/marvel.svg')
	})

	it('should render buttons', () => {
		expect(compiled.querySelectorAll('button')[1].textContent).toEqual('myComics')
	})
})
