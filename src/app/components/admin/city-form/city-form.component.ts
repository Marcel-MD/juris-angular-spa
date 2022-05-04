import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { City } from 'src/app/models/city/city';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-city-form',
  templateUrl: './city-form.component.html',
  styleUrls: ['./city-form.component.css'],
})
export class CityFormComponent implements OnInit {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  cities: City[] = [];

  constructor(private cityService: CityService) {}

  ngOnInit(): void {
    this.cityService.getCities().subscribe((cities) => {
      this.cities = cities;
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (!value) return;

    this.cityService.createCity({ name: value }).subscribe((c) => {
      this.cities.push(c);
    });

    event.chipInput!.clear();
  }

  deleteCity(id: number) {
    this.cityService.deleteCity(id).subscribe(() => {
      this.cities = this.cities.filter((c) => c.id != id);
    });
  }
}
