import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { CharacterService } from './character.service'

describe('CharacterService', () => {
  const okResponse: JSON = require('../../../tests/testdata/okResponse.json')
  const badRequestResponse: JSON = require('../../../tests/testdata/badRequestResponse.json')
  let service: CharacterService
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [CharacterService],
    });
    service = TestBed.inject(CharacterService)
    httpMock = TestBed.inject(HttpTestingController)
    httpMock.verify()
  });

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('When fetching characters', () => {

    it('should return the response from server', done => {
      service.fetchCharacters().subscribe(response => {
        expect(response.status).toEqual('Ok')
        done()
      })

      const okRequest = httpMock.expectOne('https://gateway.marvel.com/v1/public/characters?ts=1&apikey=0c80d032665836b30bb37f8c815449a7&hash=4ec8b21cab0520e1e13870bcec74ca48&limit=20')
      okRequest.flush(okResponse)
    })

    it('should accept parameter: limit', () => {
      service.fetchCharacters(5).subscribe(() => { })

      httpMock.expectOne('https://gateway.marvel.com/v1/public/characters?ts=1&apikey=0c80d032665836b30bb37f8c815449a7&hash=4ec8b21cab0520e1e13870bcec74ca48&limit=5')
    })

    it('should ignore limit = 0', () => {
      service.fetchCharacters(0).subscribe(() => { })

      httpMock.expectOne('https://gateway.marvel.com/v1/public/characters?ts=1&apikey=0c80d032665836b30bb37f8c815449a7&hash=4ec8b21cab0520e1e13870bcec74ca48&limit=20')
      httpMock.expectNone('https://gateway.marvel.com/v1/public/characters?ts=1&apikey=0c80d032665836b30bb37f8c815449a7&hash=4ec8b21cab0520e1e13870bcec74ca48&limit=0')
    })

    it('should accept parameter: offset', () => {
      service.fetchCharacters(5, 2).subscribe(() => { })

      httpMock.expectOne('https://gateway.marvel.com/v1/public/characters?ts=1&apikey=0c80d032665836b30bb37f8c815449a7&hash=4ec8b21cab0520e1e13870bcec74ca48&limit=5&offset=2')
    })

    it('should accept parameter: nameStartsWith', () => {
      service.fetchCharacters(5, 2, 'spider').subscribe(() => { })

      httpMock.expectOne('https://gateway.marvel.com/v1/public/characters?ts=1&apikey=0c80d032665836b30bb37f8c815449a7&hash=4ec8b21cab0520e1e13870bcec74ca48&limit=5&offset=2&nameStartsWith=spider')
    })

    it('should accept nameStartsWith = "" ', () => {
      service.fetchCharacters(5, 2, '').subscribe(() => { })

      httpMock.expectOne('https://gateway.marvel.com/v1/public/characters?ts=1&apikey=0c80d032665836b30bb37f8c815449a7&hash=4ec8b21cab0520e1e13870bcec74ca48&limit=5&offset=2')
      httpMock.expectNone('https://gateway.marvel.com/v1/public/characters?ts=1&apikey=0c80d032665836b30bb37f8c815449a7&hash=4ec8b21cab0520e1e13870bcec74ca48&limit=5&offset=2&nameStartsWith=')
    })

    it('should accept search by parameter: orderBy', () => {
      service.fetchCharacters(5, 2, 'spider', 'modified').subscribe(() => { })

      httpMock.expectOne('https://gateway.marvel.com/v1/public/characters?ts=1&apikey=0c80d032665836b30bb37f8c815449a7&hash=4ec8b21cab0520e1e13870bcec74ca48&limit=5&offset=2&nameStartsWith=spider&orderBy=modified')
    })

  })

  describe('When fetching a character by ID', () => {

    it('should not make a call when ID is zero', () => {
      service.fetchCharacter(0).subscribe()
      httpMock.expectNone('https://gateway.marvel.com/v1/public/characters/0?ts=1&apikey=0c80d032665836b30bb37f8c815449a7&hash=4ec8b21cab0520e1e13870bcec74ca48&limit=20')
    })

    it('should return error when ID is zero', done => {
      service.fetchCharacter(0)
        .subscribe(
          resp => { },
          error => {
            expect(error).toBeTruthy()
            done()
          })
    })

    it('should return the response from server', done => {
      service.fetchCharacter(1009610).subscribe(response => {
        expect(response.status).toEqual('Ok')
        done()
      })

      const okRequest = httpMock.expectOne('https://gateway.marvel.com/v1/public/characters/1009610?ts=1&apikey=0c80d032665836b30bb37f8c815449a7&hash=4ec8b21cab0520e1e13870bcec74ca48&limit=20')
      okRequest.flush(okResponse)
    })

  })

  describe('When fetching comics for a character ID', () => {

    it('should not make a call when ID is zero', () => {
      service.fetchCharacterComics(0).subscribe()
      httpMock.expectNone('https://gateway.marvel.com/v1/public/characters/0/comics?ts=1&apikey=0c80d032665836b30bb37f8c815449a7&hash=4ec8b21cab0520e1e13870bcec74ca48&limit=100&formatType=comic&orderBy=-onsaleDate')
    })

    it('should return error when ID is zero', done => {
      service.fetchCharacterComics(0)
        .subscribe(
          resp => { },
          error => {
            expect(error).toBeTruthy()
            done()
          })
    })

    it('should return the response from server', done => {
      service.fetchCharacterComics(1009610).subscribe(response => {
        expect(response.status).toEqual('Ok')
        done()
      })

      const okRequest = httpMock.expectOne('https://gateway.marvel.com/v1/public/characters/1009610/comics?ts=1&apikey=0c80d032665836b30bb37f8c815449a7&hash=4ec8b21cab0520e1e13870bcec74ca48&limit=100&formatType=comic&orderBy=-onsaleDate')
      okRequest.flush(okResponse)
    })

  })
})
