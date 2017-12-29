import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsComponentComponent } from './authors-component.component';

describe('AuthorsComponentComponent', () => {
  let component: AuthorsComponentComponent;
  let fixture: ComponentFixture<AuthorsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorsComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
