import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { ButtonComponent } from './button.component'

describe('ButtonComponent', () => {
  let component: ButtonComponent
  let fixture: ComponentFixture<ButtonComponent>
  let compiled: any

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ButtonComponent]
    })
      .compileComponents()
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    compiled = fixture.nativeElement
  });

  it('should create', () => {
    expect(component).toBeTruthy()
  });

  it('should render the button name', () => {
    const testButton = {
      name: 'myButton',
      link: {
        type: '',
        url: ''
      }
    }
    component.button = testButton
    fixture.detectChanges()
    expect(compiled.querySelector('button').textContent).toEqual('myButton')
  });

  it('should link to internal routes', () => {
    const testButton = {
      name: 'myInternalButton',
      link: {
        type: 'internal',
        url: '/myRoute'
      }
    }
    component.button = testButton
    fixture.detectChanges()
    expect(compiled.querySelector('a').getAttribute('href')).toEqual('/myRoute')
  });

  it('should recognize external links', () => {
    const testButton = {
      name: 'myExternalButton',
      link: {
        type: 'external',
        url: '/myLink'
      }
    }
    component.button = testButton
    fixture.detectChanges()
    expect(component.isInternalRoute).toBeFalsy()
    expect(compiled.querySelector('a').getAttribute('href')).toEqual('/myLink')
  });

});
