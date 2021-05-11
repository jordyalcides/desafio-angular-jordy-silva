import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { ButtonComponent } from './button.component'

describe('ButtonComponent', () => {
  let buttons: Button[]
  let component: ButtonComponent
  let fixture: ComponentFixture<ButtonComponent>
  let compiled: any

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ButtonComponent]
    })
      .compileComponents()
    fixture = TestBed.createComponent(ButtonComponent)
    component = fixture.componentInstance

    buttons = [
      {
        name: 'myInternalButton',
        link: {
          type: 'internal',
          url: '/myRoute'
        }
      },
      {
        name: 'myExternalButton',
        link: {
          type: 'external',
          url: '/myLink'
        }
      }
    ]

    fixture.detectChanges()
    compiled = fixture.nativeElement
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should render the button name', () => {
    component.button = buttons[0]
    fixture.detectChanges()
    expect(compiled.querySelector('button').textContent).toContain(buttons[0].name)
  })

  it('should link to internal routes', () => {
    component.button = buttons[0]
    fixture.detectChanges()
    expect(compiled.querySelector('a').getAttribute('href')).toContain(buttons[0].link.url)
  })

  it('should recognize external links', () => {
    component.button = buttons[1]
    fixture.detectChanges()
    expect(component.isInternalRoute).toBeFalsy()
    expect(compiled.querySelector('a').getAttribute('href')).toContain(buttons[1].link.url)
  })

})
