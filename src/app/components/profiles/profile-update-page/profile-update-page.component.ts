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

  education = new FormGroup({
    institution: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    speciality: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    startDate: new FormControl(undefined, [Validators.required]),
    endDate: new FormControl(),
  });

  experience = new FormGroup({
    company: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    position: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    startDate: new FormControl(undefined, [Validators.required]),
    endDate: new FormControl(),
  });

  profileId?: number;
  categories: ProfileCategory[] = [];
  cities: City[] = [];
  educations: Education[] = [];
  experiences: Experience[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
    private categoryService: ProfileCategoryService,
    private cityService: CityService,
    private educationService: EducationService,
    private experienceService: ExperienceService
  ) {}

  ngOnInit(): void {
    this.cityService.getCities().subscribe((cities) => {
      this.cities = cities;
    });

    this.categoryService.getProfileCategories().subscribe((categories) => {
      this.categories = categories;
    });

    let id = Number(this.route.snapshot.paramMap.get('id'));
    this.profileId = id;
    this.profileService.getProfileById(id).subscribe((profile) => {
      this.profile.patchValue({
        profileCategoryId: profile.profileCategory.id,
        cityId: profile.city.id,
        ...profile,
      });

      this.educations = profile.educations;
      this.experiences = profile.experiences;
    });
  }

  updateProfile() {
    if (!this.profileId) return;
    if (this.profile.invalid) return;

    this.profileService
      .updateProfile(this.profileId, this.profile.value as UpdateProfile)
      .subscribe();
  }

  addEducation() {
    if (!this.profileId) return;
    if (this.education.invalid) return;

    this.educationService
      .createEducation(this.profileId, this.education.value as Education)
      .subscribe((e) => {
        if (!e) return;
        this.educations.push(e);
      });
  }

  deleteEducation(id: number) {
    this.educationService.deleteEducation(id).subscribe(() => {
      this.educations = this.educations.filter((e) => e.id != id);
    });
  }

  addExperience() {
    if (!this.profileId) return;
    if (this.experience.invalid) return;

    this.experienceService
      .createExperience(this.profileId, this.experience.value as Experience)
      .subscribe((e) => {
        if (!e) return;
        this.experiences.push(e);
      });
  }

  deleteExperience(id: number) {
    this.experienceService.deleteExperience(id).subscribe(() => {
      this.experiences = this.experiences.filter((e) => e.id != id);
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

  getEducationErrorMessage(field: string | string[]): string {
    let fc = this.education.get(field);
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

    return 'Invalid field';
  }

  getExperienceErrorMessage(field: string | string[]): string {
    let fc = this.experience.get(field);
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

    return 'Invalid field';
  }
}
