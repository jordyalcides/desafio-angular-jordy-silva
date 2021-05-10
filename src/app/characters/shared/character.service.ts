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
    "hash": this.hash
  }

  constructor(private http: HttpClient) { }

  fetchCharacters(limit?: number, offset?: number, orderBy?: CharactersOrderBy, nameStartsWith?: string) {
    const _limit = limit ? { limit } : null
    const _offset = offset ? { offset } : null
    const _orderBy = orderBy ? { orderBy } : null
    const _nameStartsWith = nameStartsWith ? { nameStartsWith } : null

    const params = Object.assign({}, this.requiredParams, _limit, _offset, _orderBy, _nameStartsWith)

    return this.http.get<CharacterDataWrapper>(this.baseURL, {
      params
    })
  }

  fetchCharacter(characterID: number) {
    const id = characterID.toString()
    if (id.length < 7) return throwError({
      "code": 500,
      "status": "Character ID is too small"
    })

    const params = {
      ...this.requiredParams
    }

    return this.http.get<CharacterDataWrapper>(this.baseURL + `/${id}`, {
      params
    })
  }

  fetchCharacterComics(characterID: number, limit?: number, offset?: number, orderBy?: ComicsOrderBy, titleStartsWith?: string, noVariants?: boolean, formatType?: ComicFormatType, format?: ComicFormat) {
    const id = characterID.toString()

    if (id.length < 7) return throwError({
      "code": 500,
      "status": "Character ID is too small"
    })

    const _limit = limit ? { limit } : null
    const _offset = offset ? { offset } : null
    const _orderBy = orderBy ? { orderBy } : null
    const _titleStartsWith = titleStartsWith ? { titleStartsWith } : null
    const _noVariants = noVariants ? { noVariants } : null
    const _formatType = formatType ? { formatType } : null
    const _format = format ? { format } : null

    const params = Object.assign({}, this.requiredParams, _limit, _offset, _orderBy, _titleStartsWith, _noVariants, _formatType, _format)

    return this.http.get<ComicDataWrapper>(this.baseURL + `/${id}/comics`, {
      params
    })
  }
}
