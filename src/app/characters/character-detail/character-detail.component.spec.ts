import { HttpErrorResponse } from '@angular/common/http'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { SharedModule } from 'src/app/shared/shared.module'
import { CharacterDetailComponent } from './character-detail.component'

describe('CharacterDetailComponent', () => {
  const characterResponse: CharacterDataWrapper = require('../../../tests/testdata/characterResponse.json')
  const characterComicsResponse: ComicDataWrapper = require('../../../tests/testdata/characterComicsResponse.json')
  const unknownErrorResponse: HttpErrorResponse = require('../../../tests/testdata/unknownErrorResponse.json')
  const characterRequestURL: string = 'https://gateway.marvel.com/v1/public/characters/1009610?ts=1&apikey=0c80d032665836b30bb37f8c815449a7&hash=4ec8b21cab0520e1e13870bcec74ca48'
  const characterComicsRequestURL: string = 'https://gateway.marvel.com/v1/public/characters/1009610/comics?ts=1&apikey=0c80d032665836b30bb37f8c815449a7&hash=4ec8b21cab0520e1e13870bcec74ca48'
  const defaultImage: string = 'assets/img/media-no-img'
  let component: CharacterDetailComponent
  let fixture: ComponentFixture<CharacterDetailComponent>
  let httpMock: HttpTestingController
  let compiled: any

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule
      ],
      declarations: [CharacterDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                id: characterResponse.data.results[0].id
              }
            }
          }
        }
      ]
    })
      .compileComponents()
    httpMock = TestBed.inject(HttpTestingController)
    fixture = TestBed.createComponent(CharacterDetailComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('On "Ok" response from server', () => {
    const character = characterResponse.data.results[0]
    const comic = characterComicsResponse.data.results[0]
    beforeEach(() => {
      httpMock
        .expectOne(characterRequestURL)
        .flush(characterResponse)
      httpMock
        .expectOne(characterComicsRequestURL)
        .flush(characterComicsResponse)
      httpMock.verify()
      fixture.detectChanges()
      compiled = fixture.nativeElement
    })

    it('should be able to fetch a character by ID', () => {
      expect(component.character.id).toEqual(character.id)
    })

    it('should be able to select the pricey comic for that character', () => {
      expect(component.comic.prices![0].price).toEqual(comic.prices![0].price)
    })

    it('should render name', () => {
      expect(compiled.querySelector('.characterContainer').textContent).toContain(character.name)
    })

    it('should render description', () => {
      expect(compiled.querySelector('.characterContainer').textContent).toContain(character.description)
    })

    it('should render character picture', () => {
      expect(compiled.querySelector('.characterContainer img').getAttribute('src')).toContain(character.thumbnail?.path)
    })

    it('should render comic name', () => {
      expect(compiled.querySelector('.bestComicContainer').textContent).toContain(comic.title)
    })

    it('should render comic picture', () => {
      expect(compiled.querySelector('.bestComicContainer img').getAttribute('src')).toContain(comic.thumbnail?.path)
    })

    it('should render comic button', () => {
      expect(compiled.querySelector('.bestComicContainer marvel-button')).toBeTruthy()
    })

    it('should take to comic page on comic button click', () => {
      expect(compiled.querySelector('.bestComicContainer marvel-button a').getAttribute('href')).toEqual(`/comics/${comic.id}`)
    })
  })

  describe('On error response from server', () => {
    describe('On error for character retrieve', () => {
      const error = unknownErrorResponse.message
      beforeEach(() => {
        httpMock
          .expectOne(characterRequestURL)
          .flush({}, unknownErrorResponse)
        httpMock
          .expectOne(characterComicsRequestURL)
          .flush({}, unknownErrorResponse)
        httpMock.verify()
        fixture.detectChanges()
        compiled = fixture.nativeElement
      })

      it('should show error message if character retrieve failed', () => {
        expect(compiled.querySelector('.errorWarning').textContent).toContain(error)
      })
    })

    describe('On error for character comic retrieve', () => {

      beforeEach(() => {
        httpMock
          .expectOne(characterRequestURL)
          .flush(characterResponse)
        httpMock
          .expectOne(characterComicsRequestURL)
          .flush({}, unknownErrorResponse)
        httpMock.verify()
        fixture.detectChanges()
        compiled = fixture.nativeElement
      })

      it('should show default image if character comic retrieve failed', () => {
        expect(compiled.querySelector('.bestComicContainer img').getAttribute('src')).toContain(defaultImage)
      })
    })

  })
})
