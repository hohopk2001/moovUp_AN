import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateNodePathComponent } from './calculate-node-path.component';

describe('CalculateNodePathComponent', () => {
  let component: CalculateNodePathComponent;
  let fixture: ComponentFixture<CalculateNodePathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalculateNodePathComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalculateNodePathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
