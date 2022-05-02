import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Education } from 'src/app/models/education/education';
import { EducationService } from 'src/app/services/education.service';

@Component({
  selector: 'app-update-education',
  templateUrl: './update-education.component.html',
  styleUrls: ['./update-education.component.css'],
})
export class UpdateEducationComponent implements OnInit {
  @Input() profileId!: number;

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

  educations: Education[] = [];

  constructor(private educationService: EducationService) {}

  ngOnInit(): void {
    this.educationService.getEducations(this.profileId).subscribe((e) => {
      this.educations = e;
    });
  }

  addEducation() {
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
}
