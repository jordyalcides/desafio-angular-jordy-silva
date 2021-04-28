import { TestBed } from '@angular/core/testing';

import { CharacterService } from './character.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs';

describe('CharacterService', () => {
  let service: CharacterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [CharacterService],
    });
    service = TestBed.inject(CharacterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return "Ok" response from API', () => {
    function callSubscribe(obs: Observable<CharacterDataWrapper>) {
      obs.subscribe(response => {
        expect(response.status).toBe('Ok')
      }).unsubscribe()
    }
    let obs = service.fetchCharacters()
    callSubscribe(obs)
  });
});
