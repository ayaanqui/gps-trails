import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtrailComponent } from './addtrail.component';

describe('AddtrailComponent', () => {
  let component: AddtrailComponent;
  let fixture: ComponentFixture<AddtrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddtrailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Need valid email address of registered user', () => {
    
  });

});
