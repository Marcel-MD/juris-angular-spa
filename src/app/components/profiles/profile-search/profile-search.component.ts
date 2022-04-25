import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileStatusEnum } from 'src/app/models/enums/profile-status.enum';
import { ListProfile } from 'src/app/models/profile/list-profile';
import { ProfileQueryParams } from 'src/app/models/profile/profile-query-params';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile-search',
  templateUrl: './profile-search.component.html',
  styleUrls: ['./profile-search.component.css'],
})
export class ProfileSearchComponent implements OnInit {
  defaultParams: ProfileQueryParams = {
    pageNumber: 1,
    status: ProfileStatusEnum.Approved,
  };

  profiles: ListProfile[] = [];

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.getProfiles(true);
  }

  getProfiles(onSearch: boolean) {
    if (onSearch) {
      this.defaultParams.pageNumber = 1;
    }

    this.route.queryParams.subscribe((queryParams) => {
      let params = queryParams as ProfileQueryParams;
      params = { ...this.defaultParams, ...params };
      this.profileService.getProfiles(params).subscribe((profiles) => {
        this.profiles = profiles;
      });
    });
  }

  nextPage() {
    if (this.profiles.length < 5 || !this.defaultParams.pageNumber) return;
    this.defaultParams.pageNumber++;
    this.getProfiles(false);
  }

  previousPage() {
    if (!this.defaultParams.pageNumber || this.defaultParams.pageNumber < 2)
      return;
    this.defaultParams.pageNumber--;
    this.getProfiles(false);
  }
}
