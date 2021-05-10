import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { CharacterService } from './character.service'

describe('CharacterService', () => {
  const okResponse: JSON = require('../../../tests/testdata/okResponse.json')
  const baseURL = 'https://gateway.marvel.com/v1/public/characters'
  const requiredParams = '?ts=1&apikey=0c80d032665836b30bb37f8c815449a7&hash=4ec8b21cab0520e1e13870bcec74ca48'
  let service: CharacterService
  let httpMock: HttpTestingController

  function parseObjectToQueryString(objParams: Object) {
    const params = Object.entries(objParams)
    let query = ''

    params.forEach(param => {
      query = query + `&${param[0]}=${param[1]}`
    })
    return query
  }

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

      const okRequest = httpMock.expectOne(`${baseURL}${requiredParams}`)
      okRequest.flush(okResponse)
    })

    it('should accept parameter: limit', () => {
      const _params = {
        limit: 5
      }
      const params = parseObjectToQueryString(_params)

      service.fetchCharacters(_params.limit).subscribe()

      httpMock.expectOne(`${baseURL}${requiredParams}${params}`)
    })

    it('should ignore limit = 0', () => {
      const _params = {
        limit: 0
      }
      const params = parseObjectToQueryString(_params)

      service.fetchCharacters(_params.limit).subscribe()

      httpMock.expectOne(`${baseURL}${requiredParams}`)
      httpMock.expectNone(`${baseURL}${requiredParams}${params}`)
    })

    it('should accept parameter: offset', () => {
      const _params = {
        limit: 5,
        offset: 2
      }
      const params = parseObjectToQueryString(_params)

      service.fetchCharacters(_params.limit, _params.offset).subscribe()

      httpMock.expectOne(`${baseURL}${requiredParams}${params}`)
    })

    it('should accept search by parameter: orderBy', () => {
      const _params = {
        limit: 5,
        offset: 2,
        orderBy: 'modified' as CharactersOrderBy
      }
      const params = parseObjectToQueryString(_params)

      service.fetchCharacters(
        _params.limit,
        _params.offset,
        _params.orderBy
      ).subscribe()

      httpMock.expectOne(`${baseURL}${requiredParams}${params}`)
    })

    it('should accept parameter: nameStartsWith', () => {
      const _params = {
        limit: 5,
        offset: 2,
        orderBy: 'modified' as CharactersOrderBy,
        nameStartsWith: 'spider'
      }
      const params = parseObjectToQueryString(_params)

      service.fetchCharacters(
        _params.limit,
        _params.offset,
        _params.orderBy,
        _params.nameStartsWith
      ).subscribe()

      httpMock.expectOne(`${baseURL}${requiredParams}${params}`)
    })

    it('should ignore nameStartsWith = "" ', () => {
      const _params = {
        limit: 5,
        offset: 2,
        orderBy: 'modified' as CharactersOrderBy,
      }
      const params = parseObjectToQueryString(_params)

      service.fetchCharacters(
        _params.limit,
        _params.offset,
        _params.orderBy,
        ''
      ).subscribe()

      httpMock.expectOne(`${baseURL}${requiredParams}${params}`)
      httpMock.expectNone(`${baseURL}${requiredParams}${params}&nameStartsWith=`)
    })

  })

  describe('When fetching a character by ID', () => {

    it('should not make a call when ID length is less than 7', () => {
      const characterID = 0
      service.fetchCharacter(characterID).subscribe()
      httpMock.expectNone(`${baseURL}/${characterID}${requiredParams}`)
    })

    it('should return error when ID length is less than 7', done => {
      service.fetchCharacter(0)
        .subscribe(
          resp => { },
          error => {
            expect(error).toBeTruthy()
            done()
          })
    })

    it('should return the response from server', done => {
      const characterID = 1009610
      service.fetchCharacter(characterID).subscribe(response => {
        expect(response.status).toEqual('Ok')
        done()
      })

      const okRequest = httpMock.expectOne(`${baseURL}/${characterID}${requiredParams}`)
      okRequest.flush(okResponse)
    })

  })

  describe('When fetching comics for a character ID', () => {

    it('should not make a call when ID length is less than 7', () => {
      const characterID = 0
      service.fetchCharacterComics(characterID).subscribe()
      httpMock.expectNone(`${baseURL}/${characterID}/comics${requiredParams}`)
    })

    it('should return error when ID length is less than 7', done => {
      service.fetchCharacterComics(0)
        .subscribe(
          resp => { },
          error => {
            expect(error).toBeTruthy()
            done()
          })
    })

    it('should return the response from server', done => {
      const characterID = 1009610
      service.fetchCharacterComics(characterID).subscribe(response => {
        expect(response.status).toEqual('Ok')
        done()
      })

      const okRequest = httpMock.expectOne(`${baseURL}/${characterID}/comics${requiredParams}`)
      okRequest.flush(okResponse)
    })

    it('should accept parameter: limit', () => {
      const characterID = 1009610
      const _params = {
        limit: 5
      }
      const params = parseObjectToQueryString(_params)

      service.fetchCharacterComics(characterID, _params.limit).subscribe()

      httpMock.expectOne(`${baseURL}/${characterID}/comics${requiredParams}${params}`)
    })

    it('should accept parameter: offset', () => {
      const characterID = 1009610
      const _params = {
        limit: 5,
        offset: 3,
      }
      const params = parseObjectToQueryString(_params)

      service.fetchCharacterComics(
        characterID,
        _params.limit,
        _params.offset
      ).subscribe()

      httpMock.expectOne(`${baseURL}/${characterID}/comics${requiredParams}${params}`)
    })

    it('should accept parameter: orderBy', () => {
      const characterID = 1009610
      const _params = {
        limit: 5,
        offset: 3,
        orderBy: 'onsaleDate' as ComicsOrderBy
      }
      const params = parseObjectToQueryString(_params)

      service.fetchCharacterComics(
        characterID,
        _params.limit,
        _params.offset,
        _params.orderBy
      ).subscribe()

      httpMock.expectOne(`${baseURL}/${characterID}/comics${requiredParams}${params}`)
    })

    it('should accept parameter: titleStartsWith', () => {
      const characterID = 1009610
      const _params = {
        limit: 5,
        offset: 3,
        orderBy: 'onsaleDate' as ComicsOrderBy,
        titleStartsWith: 'spider',
      }
      const params = parseObjectToQueryString(_params)

      service.fetchCharacterComics(
        characterID,
        _params.limit,
        _params.offset,
        _params.orderBy,
        _params.titleStartsWith
      ).subscribe()

      httpMock.expectOne(`${baseURL}/${characterID}/comics${requiredParams}${params}`)
    })

    it('should ignore titleStartsWith = "" ', () => {
      const characterID = 1009610
      const _params = {
        limit: 5,
        offset: 3,
        orderBy: 'onsaleDate' as ComicsOrderBy
      }
      const params = parseObjectToQueryString(_params)

      service.fetchCharacterComics(
        characterID,
        _params.limit,
        _params.offset,
        _params.orderBy,
        ''
      ).subscribe()

      httpMock.expectOne(`${baseURL}/${characterID}/comics${requiredParams}${params}`)
      httpMock.expectNone(`${baseURL}/${characterID}/comics${requiredParams}${params}&titleStartsWith=`)
    })

    it('should accept parameter: noVariant', () => {
      const characterID = 1009610
      const _params = {
        limit: 5,
        offset: 3,
        orderBy: 'onsaleDate' as ComicsOrderBy,
        titleStartsWith: 'spider',
        noVariants: true,
      }
      const params = parseObjectToQueryString(_params)

      service.fetchCharacterComics(
        characterID,
        _params.limit,
        _params.offset,
        _params.orderBy,
        _params.titleStartsWith,
        _params.noVariants
      ).subscribe()

      httpMock.expectOne(`${baseURL}/${characterID}/comics${requiredParams}${params}`)
    })

    it('should accept parameter: formatType', () => {
      const characterID = 1009610
      const _params = {
        limit: 5,
        offset: 3,
        orderBy: 'onsaleDate' as ComicsOrderBy,
        titleStartsWith: 'spider',
        noVariants: true,
        formatType: 'collection' as ComicFormatType
      }
      const params = parseObjectToQueryString(_params)

      service.fetchCharacterComics(
        characterID,
        _params.limit,
        _params.offset,
        _params.orderBy,
        _params.titleStartsWith,
        _params.noVariants,
        _params.formatType
      ).subscribe()

      httpMock.expectOne(`${baseURL}/${characterID}/comics${requiredParams}${params}`)
    })

    it('should accept parameter: format', () => {
      const characterID = 1009610
      const _params = {
        limit: 5,
        offset: 3,
        orderBy: 'onsaleDate' as ComicsOrderBy,
        titleStartsWith: 'spider',
        noVariants: true,
        formatType: 'collection' as ComicFormatType,
        format: 'hardcover' as ComicFormat
      }
      const params = parseObjectToQueryString(_params)

      service.fetchCharacterComics(
        characterID,
        _params.limit,
        _params.offset,
        _params.orderBy,
        _params.titleStartsWith,
        _params.noVariants,
        _params.formatType,
        _params.format
      ).subscribe()

      httpMock.expectOne(`${baseURL}/${characterID}/comics${requiredParams}${params}`)
    })
  })
})
