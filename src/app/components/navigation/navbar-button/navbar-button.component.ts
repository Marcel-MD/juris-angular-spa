import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from '../menu-item';

@Component({
  selector: 'app-navbar-button',
  templateUrl: './navbar-button.component.html',
  styleUrls: ['./navbar-button.component.css'],
})
export class NavbarButtonComponent implements OnInit {
  @Input() item!: MenuItem;

  constructor() {}

  ngOnInit(): void {}
}
