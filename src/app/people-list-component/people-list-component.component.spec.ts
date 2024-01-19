import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleListComponentComponent } from './people-list-component.component';

describe('PeopleListComponentComponent', () => {
  let component: PeopleListComponentComponent;
  let fixture: ComponentFixture<PeopleListComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeopleListComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PeopleListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
