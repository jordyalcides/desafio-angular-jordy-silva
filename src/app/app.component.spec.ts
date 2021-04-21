import { AppComponent } from './app.component';
import { async, inject, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PagesModule } from './pages/pages.module';
import { CharactersModule } from './characters/characters.module';
import { CharacterService } from './characters/character/character.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientTestingModule,
        RouterTestingModule,
        PagesModule,
        CharactersModule
      ],
      providers: [CharacterService],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should create the app', async(inject([HttpTestingController, CharacterService],
    (httpClient: HttpTestingController, CharacterService: CharacterService) => {
      expect(CharacterService).toBeTruthy();
    })));

});
