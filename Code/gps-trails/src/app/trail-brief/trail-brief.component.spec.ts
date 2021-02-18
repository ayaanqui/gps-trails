import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailBriefComponent } from './trail-brief.component';

describe('TrailBriefComponent', () => {
  let component: TrailBriefComponent;
  let fixture: ComponentFixture<TrailBriefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrailBriefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrailBriefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
