import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { SharedModule } from 'src/app/shared/shared.module'

import { CharacterDetailComponent } from './character-detail.component'

describe('CharacterDetailComponent', () => {
  let component: CharacterDetailComponent
  let fixture: ComponentFixture<CharacterDetailComponent>
  let compiled: any

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule
      ],
      declarations: [CharacterDetailComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterDetailComponent)
    component = fixture.componentInstance
    component.character = {
      name: 'myHeroName',
      description: 'Description of myHeroName',
      thumbnail: {
        path: 'assets/img/media-no-img',
        extension: 'jpg'
      }
    }
    component.comic = {
      title: 'myHeroComicTitle',
      thumbnail: {
        path: 'assets/img/media-no-img',
        extension: 'jpg'
      }
    }
    component.comicButton = {
      name: 'myHeroButton',
      link: {}
    }
    fixture.detectChanges()
    compiled = fixture.nativeElement
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should render name', () => {
    expect(compiled.querySelector('.characterContainer h1').textContent).toEqual(' myHeroName ')
  })

  it('should render description', () => {
    expect(compiled.querySelector('.characterContainer p').textContent).toEqual(' Description of myHeroName ')
  })

  it('should render character picture', () => {
    expect(compiled.querySelector('.characterContainer img').getAttribute('src')).toEqual('assets/img/media-no-img.jpg')
  })

  it('should render comic name', () => {
    expect(compiled.querySelector('.bestComicContainer p').textContent).toEqual(' myHeroComicTitle ')
  })

  it('should render comic picture', () => {
    expect(compiled.querySelector('.bestComicContainer img').getAttribute('src')).toEqual('assets/img/media-no-img.jpg')
  })

  it('should render comic button', () => {
    expect(compiled.querySelector('.bestComicContainer marvel-button').textContent).toEqual('myHeroButton')
  })
})
