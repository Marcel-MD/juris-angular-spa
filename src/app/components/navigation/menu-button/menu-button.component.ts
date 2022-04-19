import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from '../menu-item';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.css'],
})
export class MenuButtonComponent implements OnInit {
  @Input() item!: MenuItem;

  constructor() {}

  ngOnInit(): void {}
}
