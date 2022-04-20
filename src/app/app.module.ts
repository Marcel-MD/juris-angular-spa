import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MessagesComponent } from './components/messages/messages.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

import { FlexLayoutModule } from '@angular/flex-layout';
import { NavbarButtonComponent } from './components/navigation/navbar-button/navbar-button.component';
import { MenuButtonComponent } from './components/navigation/menu-button/menu-button.component';
import { NavbarComponent } from './components/navigation/navbar/navbar.component';
import { AppointmentsPageComponent } from './components/appointments/appointments-page/appointments-page.component';
import { ProfilePageComponent } from './components/profiles/profile-page/profile-page.component';
import { ProfileSearchComponent } from './components/profiles/profile-search/profile-search.component';
import { AppointmentComponent } from './components/appointments/appointment/appointment.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarButtonComponent,
    MenuButtonComponent,
    NavbarComponent,
    AppointmentsPageComponent,
    ProfilePageComponent,
    ProfileSearchComponent,
    AppointmentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,

    FlexLayoutModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
