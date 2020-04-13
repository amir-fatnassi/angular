import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { MovisListComponent } from './movis-list/movis-list.component';
import { SingleMoviComponent } from './movis-list/single-movi/single-movi.component';
import { MoviFormComponent } from './movis-list/movi-form/movi-form.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { MovisService } from './services/movis.service';
import { AuthGuardService } from './services/auth-guard.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent},
  { path: 'auth/signin', component: SigninComponent},
  { path: 'movis', canActivate: [AuthGuardService], component: MovisListComponent},
  { path: 'movis/new', canActivate: [AuthGuardService], component: MoviFormComponent},
  { path: 'movis/view/:id', canActivate: [AuthGuardService], component: SingleMoviComponent},
  { path: '', redirectTo: 'movis', pathMatch: 'full'},
  { path: '**', redirectTo: 'movis'}
]

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    MovisListComponent,
    SingleMoviComponent,
    MoviFormComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    AppRoutingModule
  ],
  providers: [
    AuthService,
    MovisService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
