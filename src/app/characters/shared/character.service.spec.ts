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
    const _params = Object.entries(objParams)
    let query = ''

    _params.forEach(_param => {
      query = query + `&${_param[0]}=${_param[1]}`
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
      service
        .fetchCharacters()
        .subscribe(
          response => {
            expect(response).toMatchObject(okResponse)
            done()
          })

      httpMock
        .expectOne(`${baseURL}${requiredParams}`)
        .flush(okResponse)
    })

    it('should accept parameter: limit', () => {
      const params = {
        limit: 5
      }
      const queryParams = parseObjectToQueryString(params)

      service
        .fetchCharacters(params.limit)
        .subscribe()

      httpMock
        .expectOne(`${baseURL}${requiredParams}${queryParams}`)
    })

    it('should ignore limit = 0', () => {
      const params = {
        limit: 0
      }
      const queryParams = parseObjectToQueryString(params)

      service
        .fetchCharacters(params.limit)
        .subscribe()

      httpMock
        .expectOne(`${baseURL}${requiredParams}`)
      httpMock
        .expectNone(`${baseURL}${requiredParams}${queryParams}`)
    })

    it('should accept parameter: offset', () => {
      const params = {
        limit: 5,
        offset: 2
      }
      const queryParams = parseObjectToQueryString(params)

      service
        .fetchCharacters(
          params.limit,
          params.offset
        )
        .subscribe()

      httpMock
        .expectOne(`${baseURL}${requiredParams}${queryParams}`)
    })

    it('should accept search by parameter: orderBy', () => {
      const params = {
        limit: 5,
        offset: 2,
        orderBy: 'modified' as CharactersOrderBy
      }
      const queryParams = parseObjectToQueryString(params)

      service
        .fetchCharacters(
          params.limit,
          params.offset,
          params.orderBy
        )
        .subscribe()

      httpMock
        .expectOne(`${baseURL}${requiredParams}${queryParams}`)
    })

    it('should accept parameter: nameStartsWith', () => {
      const params = {
        limit: 5,
        offset: 2,
        orderBy: 'modified' as CharactersOrderBy,
        nameStartsWith: 'spider'
      }
      const queryParams = parseObjectToQueryString(params)

      service
        .fetchCharacters(
          params.limit,
          params.offset,
          params.orderBy,
          params.nameStartsWith
        )
        .subscribe()

      httpMock
        .expectOne(`${baseURL}${requiredParams}${queryParams}`)
    })

    it('should ignore nameStartsWith = "" ', () => {
      const params = {
        limit: 5,
        offset: 2,
        orderBy: 'modified' as CharactersOrderBy,
      }
      const queryParams = parseObjectToQueryString(params)

      service
        .fetchCharacters(
          params.limit,
          params.offset,
          params.orderBy,
          ''
        )
        .subscribe()

      httpMock
        .expectOne(`${baseURL}${requiredParams}${queryParams}`)
      httpMock
        .expectNone(`${baseURL}${requiredParams}${queryParams}&nameStartsWith=`)
    })

  })

  describe('When fetching a character by ID', () => {

    it('should not make a call when ID length is less than 7', () => {
      const characterID = 0
      service
        .fetchCharacter(characterID)
        .subscribe()
      httpMock
        .expectNone(`${baseURL}/${characterID}${requiredParams}`)
    })

    it('should return error when ID length is less than 7', done => {
      service
        .fetchCharacter(0)
        .subscribe(
          resp => { },
          error => {
            expect(error).toBeTruthy()
            done()
          })
    })

    it('should return the response from server', done => {
      const characterID = 1009610
      service
        .fetchCharacter(characterID)
        .subscribe(response => {
          expect(response).toMatchObject(okResponse)
          done()
        })

      httpMock
        .expectOne(`${baseURL}/${characterID}${requiredParams}`)
        .flush(okResponse)
    })

  })

  describe('When fetching comics for a character ID', () => {

    it('should not make a call when ID length is less than 7', () => {
      const characterID = 0
      service
        .fetchCharacterComics(characterID)
        .subscribe()
      httpMock
        .expectNone(`${baseURL}/${characterID}/comics${requiredParams}`)
    })

    it('should return error when ID length is less than 7', done => {
      service
        .fetchCharacterComics(0)
        .subscribe(
          resp => { },
          error => {
            expect(error).toBeTruthy()
            done()
          })
    })

    it('should return the response from server', done => {
      const characterID = 1009610
      service
        .fetchCharacterComics(characterID)
        .subscribe(response => {
          expect(response).toMatchObject(okResponse)
          done()
        })

      httpMock
        .expectOne(`${baseURL}/${characterID}/comics${requiredParams}`)
        .flush(okResponse)
    })

    it('should accept parameter: limit', () => {
      const characterID = 1009610
      const params = {
        limit: 5
      }
      const queryParams = parseObjectToQueryString(params)

      service
        .fetchCharacterComics(characterID, params.limit)
        .subscribe()

      httpMock
        .expectOne(`${baseURL}/${characterID}/comics${requiredParams}${queryParams}`)
    })

    it('should accept parameter: offset', () => {
      const characterID = 1009610
      const params = {
        limit: 5,
        offset: 3,
      }
      const queryParams = parseObjectToQueryString(params)

      service
        .fetchCharacterComics(
          characterID,
          params.limit,
          params.offset
        )
        .subscribe()

      httpMock
        .expectOne(`${baseURL}/${characterID}/comics${requiredParams}${queryParams}`)
    })

    it('should accept parameter: orderBy', () => {
      const characterID = 1009610
      const params = {
        limit: 5,
        offset: 3,
        orderBy: 'onsaleDate' as ComicsOrderBy
      }
      const queryParams = parseObjectToQueryString(params)

      service
        .fetchCharacterComics(
          characterID,
          params.limit,
          params.offset,
          params.orderBy
        )
        .subscribe()

      httpMock
        .expectOne(`${baseURL}/${characterID}/comics${requiredParams}${queryParams}`)
    })

    it('should accept parameter: titleStartsWith', () => {
      const characterID = 1009610
      const params = {
        limit: 5,
        offset: 3,
        orderBy: 'onsaleDate' as ComicsOrderBy,
        titleStartsWith: 'spider',
      }
      const queryParams = parseObjectToQueryString(params)

      service
        .fetchCharacterComics(
          characterID,
          params.limit,
          params.offset,
          params.orderBy,
          params.titleStartsWith
        )
        .subscribe()

      httpMock
        .expectOne(`${baseURL}/${characterID}/comics${requiredParams}${queryParams}`)
    })

    it('should ignore titleStartsWith = "" ', () => {
      const characterID = 1009610
      const params = {
        limit: 5,
        offset: 3,
        orderBy: 'onsaleDate' as ComicsOrderBy
      }
      const queryParams = parseObjectToQueryString(params)

      service
        .fetchCharacterComics(
          characterID,
          params.limit,
          params.offset,
          params.orderBy,
          ''
        )
        .subscribe()

      httpMock
        .expectOne(`${baseURL}/${characterID}/comics${requiredParams}${queryParams}`)
      httpMock
        .expectNone(`${baseURL}/${characterID}/comics${requiredParams}${queryParams}&titleStartsWith=`)
    })

    it('should accept parameter: noVariant', () => {
      const characterID = 1009610
      const params = {
        limit: 5,
        offset: 3,
        orderBy: 'onsaleDate' as ComicsOrderBy,
        titleStartsWith: 'spider',
        noVariants: true,
      }
      const queryParams = parseObjectToQueryString(params)

      service
        .fetchCharacterComics(
          characterID,
          params.limit,
          params.offset,
          params.orderBy,
          params.titleStartsWith,
          params.noVariants
        )
        .subscribe()

      httpMock
        .expectOne(`${baseURL}/${characterID}/comics${requiredParams}${queryParams}`)
    })

    it('should accept parameter: formatType', () => {
      const characterID = 1009610
      const params = {
        limit: 5,
        offset: 3,
        orderBy: 'onsaleDate' as ComicsOrderBy,
        titleStartsWith: 'spider',
        noVariants: true,
        formatType: 'collection' as ComicFormatType
      }
      const queryParams = parseObjectToQueryString(params)

      service
        .fetchCharacterComics(
          characterID,
          params.limit,
          params.offset,
          params.orderBy,
          params.titleStartsWith,
          params.noVariants,
          params.formatType
        )
        .subscribe()

      httpMock
        .expectOne(`${baseURL}/${characterID}/comics${requiredParams}${queryParams}`)
    })

    it('should accept parameter: format', () => {
      const characterID = 1009610
      const params = {
        limit: 5,
        offset: 3,
        orderBy: 'onsaleDate' as ComicsOrderBy,
        titleStartsWith: 'spider',
        noVariants: true,
        formatType: 'collection' as ComicFormatType,
        format: 'hardcover' as ComicFormat
      }
      const queryParams = parseObjectToQueryString(params)

      service
        .fetchCharacterComics(
          characterID,
          params.limit,
          params.offset,
          params.orderBy,
          params.titleStartsWith,
          params.noVariants,
          params.formatType,
          params.format
        )
        .subscribe()

      httpMock
        .expectOne(`${baseURL}/${characterID}/comics${requiredParams}${queryParams}`)
    })
  })
})
