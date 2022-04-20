import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MenuItem } from '../menu-item';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(public userService: UserService) {}

  ngOnInit(): void {}

  publicItems: MenuItem[] = [
    {
      label: 'Home',
      icon: 'home',
      link: '/home',
    },
    {
      label: 'Search',
      icon: 'search',
      link: '/search',
    },
  ];

  loginItems: MenuItem[] = [
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

  userItems: MenuItem[] = [
    {
      label: 'Profile',
      icon: 'account_circle',
      link: '/profile/' + this.userService.getUserId(),
    },
    {
      label: 'Appointments',
      icon: '3p',
      link: '/appointment/' + this.userService.getUserId(),
    },
  ];

  adminItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'rule',
      link: '/dashboard',
    },
    {
      label: 'Analytics',
      icon: 'analytics',
      link: '/analytics',
    },
  ];
}
