import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonBiographyComponent } from './person-biography.component';

describe('PersonBiographyComponent', () => {
  let component: PersonBiographyComponent;
  let fixture: ComponentFixture<PersonBiographyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonBiographyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonBiographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
