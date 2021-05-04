import { TestBed } from '@angular/core/testing'

import { CharacterService } from './character.service'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

describe('CharacterService', () => {
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

  it('should be able to fetch all characters', done => {
    const charactersResponse: JSON = require('assets/testdata/charactersResponse.json')
    service.fetchCharacters().subscribe(response => {
      expect(response.code).toEqual(200)
      expect(response.status).toBe('Ok')
      expect(response.data.total).toEqual(1493)
      expect(response.data.results[1].id).toEqual(1017100)
      done()
    })

    let charactersRequest = httpMock.expectOne('https://gateway.marvel.com/v1/public/characters?ts=1&apikey=0c80d032665836b30bb37f8c815449a7&hash=4ec8b21cab0520e1e13870bcec74ca48&limit=20')
    charactersRequest.flush(charactersResponse)

    httpMock.verify()
  })

  it('should be able to fetch a character by ID', done => {
    const characterResponse: JSON = require('assets/testdata/characterResponse.json')
    service.fetchCharacter('1009144').subscribe(response => {
      expect(response.data.total).toEqual(1)
      expect(response.data.results[0].name).toEqual('A.I.M.')
      expect(response.data.results[0].modified).toEqual('2013-10-17T14:41:30-0400')
      done()
    })

    let characterRequest = httpMock.expectOne('https://gateway.marvel.com/v1/public/characters/1009144?ts=1&apikey=0c80d032665836b30bb37f8c815449a7&hash=4ec8b21cab0520e1e13870bcec74ca48&limit=20')
    characterRequest.flush(characterResponse)

    httpMock.verify()
  })

  it('should be able to fetch first 100 comics given a character ID', done => {
    const characterComicsResponse: JSON = require('assets/testdata/characterComicsResponse.json')
    service.fetchCharacterComics('1009165').subscribe(response => {
      expect(response.data.limit).toEqual(100)
      expect(response.data.total).toEqual(1932)
      expect(response.data.count).toEqual(100)
      expect(response.data.results[1].id).toEqual(67745)
      expect(response.data.results[3].pageCount).toEqual(32)
      done()
    })

    let characterComicsRequest = httpMock.expectOne('https://gateway.marvel.com/v1/public/characters/1009165/comics?ts=1&apikey=0c80d032665836b30bb37f8c815449a7&hash=4ec8b21cab0520e1e13870bcec74ca48&limit=100&formatType=comic&orderBy=-onsaleDate')
    characterComicsRequest.flush(characterComicsResponse)

    httpMock.verify()
  })
})
