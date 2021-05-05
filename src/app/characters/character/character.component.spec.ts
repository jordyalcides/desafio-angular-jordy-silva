import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CharacterComponent } from './character.component';

describe('CharacterComponent', () => {
  let component: CharacterComponent;
  let fixture: ComponentFixture<CharacterComponent>;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CharacterComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render name', () => {
    component.name = 'Myheroname'
    fixture.detectChanges()
    expect(compiled.querySelector('.nameContainer h1').textContent).toEqual('Myheroname');
  });

  it('should render character picture', () => {
    component.img = 'assets/img/media-no-img.jpg'
    fixture.detectChanges()
    expect(compiled.querySelector('.portraitContainer img').getAttribute('src')).toEqual('assets/img/media-no-img.jpg');
  });

});
