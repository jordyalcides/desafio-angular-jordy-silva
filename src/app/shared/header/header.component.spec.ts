import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { HeaderComponent } from './header.component'

describe('HeaderComponent', () => {
	const marvelLogo = 'assets/svg/marvel'
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
		fixture = TestBed.createComponent(HeaderComponent)
		header = fixture.componentInstance

		header.buttons = [
			{
				name: 'myCharacters',
				link: {
					type: 'internal',
					url: 'characters'
				}
			},
			{
				name: 'myComics',
				link: {
					type: 'internal',
					url: 'comics'
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
		expect(compiled.querySelector('img').getAttribute('src')).toContain(marvelLogo)
	})

	it('should render buttons', () => {
		expect(compiled.querySelectorAll('button')[0].textContent).toContain(header.buttons[0].name)
		expect(compiled.querySelectorAll('button')[1].textContent).toContain(header.buttons[1].name)
	})

	it('should link to internal routes', () => {
		expect(compiled.querySelectorAll('nav a')[0].getAttribute('href')).toContain(header.buttons[0].link.url)
		expect(compiled.querySelectorAll('nav a')[1].getAttribute('href')).toContain(header.buttons[1].link.url)
	})
})
