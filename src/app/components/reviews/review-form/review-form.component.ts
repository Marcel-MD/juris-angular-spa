import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateReview } from 'src/app/models/review/create-review';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css'],
})
export class ReviewFormComponent implements OnInit {
  @Input() profileId!: number;

  formState: 'active' | 'loading' | 'success' = 'active';

  review = new FormGroup({
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
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(50),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(16),
      Validators.maxLength(250),
    ]),
    rating: new FormControl(10, [
      Validators.required,
      Validators.min(1),
      Validators.max(10),
    ]),
  });

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {}

  createReview() {
    this.formState = 'loading';
    this.reviewService
      .createReview(this.profileId, this.review.value as CreateReview)
      .subscribe((review) => {
        if (review) {
          this.formState = 'success';
        } else {
          this.formState = 'active';
        }
      });
  }

  getErrorMessage(field: string | string[]): string {
    let fc = this.review.get(field);
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

    if (fc.hasError('email')) {
      return 'Not a valid email';
    }

    return 'Invalid field';
  }
}
