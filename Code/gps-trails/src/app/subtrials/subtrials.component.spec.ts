import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtrialsComponent } from './subtrials.component';

describe('SubtrialsComponent', () => {
  let component: SubtrialsComponent;
  let fixture: ComponentFixture<SubtrialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubtrialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtrialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
