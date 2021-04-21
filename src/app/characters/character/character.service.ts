import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class CharacterService {

  publicApiKey = '0c80d032665836b30bb37f8c815449a7'
  hash = '4ec8b21cab0520e1e13870bcec74ca48'
  urlAPI = `https://gateway.marvel.com/v1/public/characters`

  constructor(private http: HttpClient) { }

  fetchCharacters() {
    return this.http.get<CharacterDataWrapper>(this.urlAPI, {
      params: {
        "ts": "1",
        "apikey": this.publicApiKey,
        "hash": this.hash
      }
    })
  }
}
