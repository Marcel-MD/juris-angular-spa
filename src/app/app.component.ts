import { Component } from '@angular/core';
import { User } from './models/user/user';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private userService: UserService) {}

  menuItems: MenuItem[] = [
    {
      label: 'Home',
      icon: 'home',
      link: '/home',
    },
    {
      label: 'Login',
      icon: 'login',
      link: '/login',
    },
    {
      label: 'Register',
      icon: 'person_add_alt',
      link: '/register',
    },
  ];

  user?: User;
}

interface MenuItem {
  label: string;
  icon: string;
  link: string;
}
