import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { CharacterComponent } from './character.component'

describe('CharacterComponent', () => {
  let component: CharacterComponent
  let fixture: ComponentFixture<CharacterComponent>
  let compiled: any

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CharacterComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterComponent)
    component = fixture.componentInstance
    component.name = 'myHeroName'
    component.img = 'assets/img/media-no-img.jpg'
    component.url = 'myCharacterPath'
    fixture.detectChanges()
    compiled = fixture.nativeElement
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should render name', () => {
    expect(compiled.querySelector('.nameContainer h1').textContent).toEqual('myHeroName')
  })

  it('should render character picture', () => {
    expect(compiled.querySelector('.portraitContainer img').getAttribute('src')).toEqual('assets/img/media-no-img.jpg')
  })

  it('should link to character route', () => {
    expect(compiled.querySelector('a').getAttribute('href')).toEqual('/myCharacterPath')
  })

})
