import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class CharacterService {

  publicApiKey = '0c80d032665836b30bb37f8c815449a7'
  hash = '4ec8b21cab0520e1e13870bcec74ca48'
  baseURL = `https://gateway.marvel.com/v1/public/characters`
  requiredParams = {
    "ts": "1",
    "apikey": this.publicApiKey,
    "hash": this.hash,
    "limit": '20'
  }

  constructor(private http: HttpClient) { }

  fetchCharacters(limit?: number, offset?: number, nameStartsWith?: string, orderBy?: CharactersOrderBy) {
    const _limit = limit ? { limit } : null
    const _offset = offset ? { offset } : null
    const _nameStartsWith = nameStartsWith ? { nameStartsWith } : null
    const _orderBy = orderBy ? { orderBy } : null

    const params = Object.assign({}, this.requiredParams, _limit, _offset, _nameStartsWith, _orderBy)

    return this.http.get<CharacterDataWrapper>(this.baseURL, {
      params
    })
  }

  fetchCharacter(characterID: number) {
    if (!characterID) return throwError({
      "code": 404,
      "status": "Character ID is zero"
    })

    const id = characterID.toString()
    const params = {
      ...this.requiredParams
    }

    return this.http.get<CharacterDataWrapper>(this.baseURL + `/${id}`, {
      params
    })
  }

  fetchCharacterComics(characterID: number) {
    if (!characterID) return throwError({
      "code": 404,
      "status": "Character ID is zero"
    })

    const id = characterID.toString()
    const params = {
      ...this.requiredParams,
      'limit': '100',
      'formatType': 'comic',
      'orderBy': '-onsaleDate'
    }

    return this.http.get<ComicDataWrapper>(this.baseURL + `/${id}/comics`, {
      params
    })
  }
}
