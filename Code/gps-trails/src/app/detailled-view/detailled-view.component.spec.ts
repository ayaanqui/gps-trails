import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailledViewComponent } from './detailled-view.component';

describe('DetailledViewComponent', () => {
  let component: DetailledViewComponent;
  let fixture: ComponentFixture<DetailledViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailledViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailledViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
