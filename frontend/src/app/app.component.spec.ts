import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { AppComponent } from './app.component';
import { AuthStatus, status } from './reducers/auth.reducer';

describe('AppComponent', () => {
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule,],
      declarations: [AppComponent],
    }).compileComponents();
  });

});
