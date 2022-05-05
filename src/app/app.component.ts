import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    this.setUpAnalytics();
  }

  setUpAnalytics() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      //@ts-ignore
      .subscribe((event: NavigationEnd) => {
        gtag('config', 'G-3P3RLZDWR0', {
          page_path: event.urlAfterRedirects,
        });
      });
  }
}
