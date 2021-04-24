import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailServiceClass } from '../home/details.service';
import { DetailledViewComponent } from './detailled-view.component';
import {HttpClientModule} from '@angular/common/http';

describe('DetailledViewComponent', () => {
  let component: DetailledViewComponent;
  let fixture: ComponentFixture<DetailledViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailledViewComponent ],
      imports: [ DetailServiceClass, HttpClientModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailledViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
