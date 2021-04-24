import { ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import { AddtrailComponent } from './addtrail.component';

describe('AddtrailComponent', () => {
  let component: AddtrailComponent;
  let fixture: ComponentFixture<AddtrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddtrailComponent ],
      imports: [ HttpClientModule ]
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

  it('should validate components filled in', () =>{
    component.email = "test@email.com"
    component.name = "test"
    component.parkname = "TestPark"
    component.trailname = "Trail"
    component.experience = "Happy"
    component.message = "Message"
    component.responsemessage = "Response"
    component.createMessage()
    
  });

});
