import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Experience } from 'src/app/models/experience/experience';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
  selector: 'app-update-experience',
  templateUrl: './update-experience.component.html',
  styleUrls: ['./update-experience.component.css'],
})
export class UpdateExperienceComponent implements OnInit {
  @Input() profileId!: number;

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

  experiences: Experience[] = [];

  constructor(private experienceService: ExperienceService) {}

  ngOnInit(): void {
    this.experienceService.getExperiences(this.profileId).subscribe((e) => {
      this.experiences = e;
    });
  }

  addExperience() {
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
