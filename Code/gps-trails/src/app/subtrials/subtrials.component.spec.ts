import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailServiceClass } from '../home/details.service';
import { SubtrialsComponent } from './subtrials.component';
import {HttpClientModule} from '@angular/common/http';

describe('SubtrialsComponent', () => {
  let component: SubtrialsComponent;
  let fixture: ComponentFixture<SubtrialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubtrialsComponent ],
      imports: [ DetailServiceClass, HttpClientModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtrialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
