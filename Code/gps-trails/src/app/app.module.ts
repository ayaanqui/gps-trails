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
import { TrailBriefComponent } from './trail-brief/trail-brief.component';
import { AgmCoreModule } from '@agm/core';
import { FormsModule } from '@angular/forms';
import { DetailledViewComponent } from './detailled-view/detailled-view.component';
import { DetailServiceClass } from './home/details.service';
import { AddtrailComponent } from './addtrail/addtrail.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'park', component: DetailledViewComponent },
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
    DetailledViewComponent,
    AddtrailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBiGAsSAOdImXha7tc52eJQ63X_KqnHyTQ'
    })
  ],
  providers: [DetailServiceClass],
  bootstrap: [AppComponent]
})
export class AppModule { }
