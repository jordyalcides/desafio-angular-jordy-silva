import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class CharacterService {

  publicApiKey = '0c80d032665836b30bb37f8c815449a7'
  hash = '4ec8b21cab0520e1e13870bcec74ca48'
  urlAPI = `https://gateway.marvel.com/v1/public/characters`
  requiredParams = {
    "ts": "1",
    "apikey": this.publicApiKey,
    "hash": this.hash,
    "limit": '20'
  }

  constructor(private http: HttpClient) { }

  fetchCharacters(searchTerm: string = '') {
    const nameFilter = searchTerm !== '' ? { 'nameStartsWith': searchTerm } : null

    const params = Object.assign({}, this.requiredParams, nameFilter)

    return this.http.get<CharacterDataWrapper | HttpErrorResponse>(this.urlAPI, {
      params
    })
  }

  fetchCharacter(id: string) {

    const params = {
      ...this.requiredParams
    }

    return this.http.get<CharacterDataWrapper | HttpErrorResponse>(this.urlAPI + `/${id}`, {
      params
    })
  }

  fetchCharacterComics(id: string) {
    const params = {
      ...this.requiredParams,
      'limit': '100',
      'formatType': 'comic',
      'orderBy': '-onsaleDate'
    }

    return this.http.get<ComicDataWrapper | HttpErrorResponse>(this.urlAPI + `/${id}/comics`, {
      params
    })
  }
}
