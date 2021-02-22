import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { HomeComponent } from './home/home.component';
import { ExploreComponent } from './explore/explore.component';
<<<<<<< HEAD
import { TrailBriefComponent } from './trail-brief/trail-brief.component';

=======
import { AgmCoreModule } from '@agm/core';
>>>>>>> 1315ac2186c13c65d4c5cd8598e64bc725442c2a


const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'register', component: RegisterComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ExploreComponent,
    TrailBriefComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBiGAsSAOdImXha7tc52eJQ63X_KqnHyTQ'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
