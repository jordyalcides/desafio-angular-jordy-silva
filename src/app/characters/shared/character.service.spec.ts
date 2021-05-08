import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { CharacterService } from './character.service'
import { HttpErrorResponse } from '@angular/common/http'

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
  });

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should have status "Ok", on sucessful response from server', done => {
    service.fetchCharacterComics('1009610').subscribe(response => {
      const okResp = response as CharacterDataWrapper
      expect(okResp).toBeTruthy()
      expect(okResp.status).toBe('Ok')
      expect(okResp.data.total).toEqual(30920)
      done()
    })

    const okRequest = httpMock.expectOne('https://gateway.marvel.com/v1/public/characters/1009610/comics?ts=1&apikey=0c80d032665836b30bb37f8c815449a7&hash=4ec8b21cab0520e1e13870bcec74ca48&limit=100&formatType=comic&orderBy=-onsaleDate')
    okRequest.flush(okResponse)
    httpMock.verify()
  })

  it('should have error message, on any other response from server', done => {
    service.fetchCharacters().subscribe(response => {
      const errorResp = response as HttpErrorResponse
      expect(errorResp).toBeTruthy()
      expect(errorResp.status).not.toBe('Ok')
      expect(errorResp.error).toBeTruthy()
      done()
    })

    const badRequest = httpMock.expectOne('https://gateway.marvel.com/v1/public/characters?ts=1&apikey=0c80d032665836b30bb37f8c815449a7&hash=4ec8b21cab0520e1e13870bcec74ca48&limit=20')
    badRequest.flush(badRequestResponse)
    httpMock.verify()
  })
})
