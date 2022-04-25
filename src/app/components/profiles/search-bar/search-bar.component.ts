import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { City } from 'src/app/models/city/city';
import { ProfileSortEnum } from 'src/app/models/enums/profile-sort.enum';
import { ProfileStatusEnum } from 'src/app/models/enums/profile-status.enum';
import { ProfileCategory } from 'src/app/models/profile-category/profile-category';
import { ProfileQueryParams } from 'src/app/models/profile/profile-query-params';
import { CityService } from 'src/app/services/city.service';
import { ProfileCategoryService } from 'src/app/services/profile-category.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  @Output() onSearch: EventEmitter<boolean> = new EventEmitter();

  queryParams: ProfileQueryParams = {
    categoryId: undefined,
    cityId: undefined,
    sortBy: undefined,
    status: undefined,
  };

  categories: ProfileCategory[] = [];
  cities: City[] = [];
  sortByValues = Object.values(ProfileSortEnum);
  statusValues = Object.values(ProfileStatusEnum);

  constructor(
    private router: Router,
    private categoryService: ProfileCategoryService,
    private cityService: CityService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.categoryService.getProfileCategories().subscribe((categories) => {
      this.categories = categories;
    });

    this.cityService.getCities().subscribe((cities) => {
      this.cities = cities;
    });
  }

  search() {
    this.router.navigate(['/search'], { queryParams: this.queryParams });
    this.onSearch.emit(true);
  }
}
