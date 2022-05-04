import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { AppointmentsPageComponent } from './components/appointments/appointments-page/appointments-page.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfilePageComponent } from './components/profiles/profile-page/profile-page.component';
import { ProfileSearchComponent } from './components/profiles/profile-search/profile-search.component';
import { ProfileUpdatePageComponent } from './components/profiles/profile-update-page/profile-update-page.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile/:id', component: ProfilePageComponent },
  { path: 'profile/:id/update', component: ProfileUpdatePageComponent },
  { path: 'appointment/:id', component: AppointmentsPageComponent },
  { path: 'profile', component: ProfileSearchComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
