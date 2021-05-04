import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ComicService {
  publicApiKey = '0c80d032665836b30bb37f8c815449a7'
  hash = '4ec8b21cab0520e1e13870bcec74ca48'
  urlAPI = `https://gateway.marvel.com/v1/public/comics`
  requiredParams = {
    "ts": "1",
    "apikey": this.publicApiKey,
    "hash": this.hash,
    "limit": '20'
  }

  constructor(private http: HttpClient) { }

  fetchComics(searchTerm: string = '') {
    const titleFilter = searchTerm !== '' ? { 'titleStartsWith': searchTerm } : null

    const params = Object.assign({}, this.requiredParams, titleFilter)

    return this.http.get<ComicDataWrapper>(this.urlAPI, {
      params
    })
  }

  fetchComic(id: string) {

    const params = {
      ...this.requiredParams
    }

    return this.http.get<ComicDataWrapper>(this.urlAPI + `/${id}`, {
      params
    })
  }
}
