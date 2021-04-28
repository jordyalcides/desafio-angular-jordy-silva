import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


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
    "limit": '100'
  }

  constructor(private http: HttpClient) { }

  fetchCharacters(searchTerm: string = '') {
    const nameStartsWith: string = searchTerm !== '' ? searchTerm : 'a'

    const params = {
      ...this.requiredParams,
      nameStartsWith
    }

    return this.http.get<CharacterDataWrapper>(this.urlAPI, {
      params
    })
  }

  fetchCharacter(id: string) {

    const params = {
      ...this.requiredParams
    }

    return this.http.get<CharacterDataWrapper>(this.urlAPI + `/${id}`, {
      params
    })
  }
}
