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
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import { NavbarButtonComponent } from './components/navigation/navbar-button/navbar-button.component';
import { MenuButtonComponent } from './components/navigation/menu-button/menu-button.component';
import { NavbarComponent } from './components/navigation/navbar/navbar.component';
import { AppointmentsPageComponent } from './components/appointments/appointments-page/appointments-page.component';
import { ProfilePageComponent } from './components/profiles/profile-page/profile-page.component';
import { ProfileSearchComponent } from './components/profiles/profile-search/profile-search.component';
import { AppointmentComponent } from './components/appointments/appointment/appointment.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ProfileCardComponent } from './components/profiles/profile-card/profile-card.component';
import { SearchBarComponent } from './components/profiles/search-bar/search-bar.component';
import { AppointmentFormComponent } from './components/appointments/appointment-form/appointment-form.component';
import { ProfileUpdatePageComponent } from './components/profiles/profile-update-page/profile-update-page.component';
import { ReviewCardComponent } from './components/reviews/review-card/review-card.component';
import { ReviewFormComponent } from './components/reviews/review-form/review-form.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { UpdateEducationComponent } from './components/educations/update-education/update-education.component';
import { UpdateExperienceComponent } from './components/experiences/update-experience/update-experience.component';
import { ProfileImageUploadComponent } from './components/profiles/profile-image-upload/profile-image-upload.component';

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
    ProfileCardComponent,
    SearchBarComponent,
    AppointmentFormComponent,
    ProfileUpdatePageComponent,
    ReviewCardComponent,
    ReviewFormComponent,
    UpdateEducationComponent,
    UpdateExperienceComponent,
    ProfileImageUploadComponent,
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
    MatSelectModule,
    MatSliderModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,

    FlexLayoutModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
