import { AppComponent } from './app.component'
import { ComponentFixture, inject, TestBed } from '@angular/core/testing'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { SharedModule } from './shared/shared.module'
import { CharactersModule } from './characters/characters.module'
import { CharacterService } from './characters/shared/character.service'

describe('AppComponent', () => {
  let app: AppComponent
  let fixture: ComponentFixture<AppComponent>
  let compiled: any

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule,
        CharactersModule
      ],
      providers: [CharacterService],
      declarations: [
        AppComponent
      ],
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent)
    app = fixture.componentInstance
    fixture.detectChanges()
    compiled = fixture.nativeElement
  })

  it('should create the app', () => {
    expect(app).toBeTruthy()
  })

  it('should create the header', () => {
    expect(compiled.querySelector('marvel-header').textContent).toContain('Comics')
  })

})
