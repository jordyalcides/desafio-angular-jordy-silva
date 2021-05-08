import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { CharacterComponent } from '../character/character.component'
import { CharactersListComponent } from './characters-list.component'

describe('CharactersListComponent', () => {
  const charactersResponse: JSON = require('../../../tests/testdata/charactersResponse.json')
  const badRequestResponse: JSON = require('../../../tests/testdata/badRequestResponse.json')
  let component: CharactersListComponent
  let fixture: ComponentFixture<CharactersListComponent>
  let httpMock: HttpTestingController
  let compiled: any

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        CharacterComponent,
        CharactersListComponent
      ]
    })
      .compileComponents()
    httpMock = TestBed.inject(HttpTestingController)
    fixture = TestBed.createComponent(CharactersListComponent)
    component = fixture.componentInstance
  })


  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('On "Ok" response from server', () => {
    beforeEach(() => {
      let charactersRequest = httpMock.expectOne('https://gateway.marvel.com/v1/public/characters?ts=1&apikey=0c80d032665836b30bb37f8c815449a7&hash=4ec8b21cab0520e1e13870bcec74ca48&limit=20')
      charactersRequest.flush(charactersResponse)
      httpMock.verify()
      fixture.detectChanges()
      compiled = fixture.nativeElement
    })

    it('should be able to fetch all characters', () => {
      expect(component.allCharacters.length).toEqual(5)
    })

    it('should filter characters with no image', () => {
      expect(component.characters[0].id).toEqual(1011334)
    })

    it('should exhibit a character name', () => {
      expect(compiled.querySelectorAll('marvel-character h1')[1].textContent).toBe('A-Bomb (HAS)')
    })

    it('should replace filtered character thumbnail with default image', () => {
      expect(compiled.querySelectorAll('marvel-character img')[3].getAttribute('src')).toBe('assets/img/media-no-img.jpg')
    })
  })

  describe('On error response from server', () => {
    beforeEach(() => {
      let charactersRequest = httpMock.expectOne('https://gateway.marvel.com/v1/public/characters?ts=1&apikey=0c80d032665836b30bb37f8c815449a7&hash=4ec8b21cab0520e1e13870bcec74ca48&limit=20')
      charactersRequest.flush(badRequestResponse)
      httpMock.verify()
      fixture.detectChanges()
      compiled = fixture.nativeElement
    })

    it('should not update properties', () => {
      expect(component.allCharacters).toEqual([])
    })
  })
})
