import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/app/models/city/city';
import { Education } from 'src/app/models/education/education';
import { Experience } from 'src/app/models/experience/experience';
import { ProfileCategory } from 'src/app/models/profile-category/profile-category';
import { UpdateProfile } from 'src/app/models/profile/update-profile';
import { CityService } from 'src/app/services/city.service';
import { EducationService } from 'src/app/services/education.service';
import { ExperienceService } from 'src/app/services/experience.service';
import { ProfileCategoryService } from 'src/app/services/profile-category.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile-update-page',
  templateUrl: './profile-update-page.component.html',
  styleUrls: ['./profile-update-page.component.css'],
})
export class ProfileUpdatePageComponent implements OnInit {
  formState: 'active' | 'loading' | 'success' = 'active';

  profile = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(50),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(16),
      Validators.maxLength(500),
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(150),
    ]),
    price: new FormControl(0, [
      Validators.required,
      Validators.min(0),
      Validators.max(900000),
    ]),
    profileCategoryId: new FormControl(undefined, [Validators.required]),
    cityId: new FormControl(undefined, [Validators.required]),
  });

  profileId?: number;
  imageName?: string;
  categories: ProfileCategory[] = [];
  cities: City[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
    private categoryService: ProfileCategoryService,
    private cityService: CityService
  ) {}

  ngOnInit(): void {
    this.cityService.getCities().subscribe((cities) => {
      this.cities = cities;
    });

    this.categoryService.getProfileCategories().subscribe((categories) => {
      this.categories = categories;
    });

    let id = Number(this.route.snapshot.paramMap.get('id'));
    this.profileService.getProfileById(id).subscribe((profile) => {
      this.profileId = profile.id;
      this.imageName = profile.imageName;
      this.profile.patchValue({
        profileCategoryId: profile.profileCategory.id,
        cityId: profile.city.id,
        ...profile,
      });
    });
  }

  updateProfile() {
    if (!this.profileId) return;
    if (this.profile.invalid) return;
    this.formState = 'loading';

    this.profileService
      .updateProfile(this.profileId, this.profile.value as UpdateProfile)
      .subscribe((p) => {
        if (!p) this.formState = 'active';
        this.formState = 'success';
      });
  }

  getProfileErrorMessage(field: string | string[]): string {
    let fc = this.profile.get(field);
    if (!fc) return 'Invalid field';

    if (fc.hasError('required')) {
      return 'You must enter a value';
    }

    if (fc.hasError('minlength')) {
      return 'Length too small';
    }

    if (fc.hasError('maxlength')) {
      return 'Length too big';
    }

    if (fc.hasError('max')) {
      return 'Number too big';
    }

    if (fc.hasError('min')) {
      return 'Number too small';
    }

    return 'Invalid field';
  }
}
