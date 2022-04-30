import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Review } from 'src/app/models/review/review';
import { ReviewService } from 'src/app/services/review.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.css'],
})
export class ReviewCardComponent implements OnInit {
  @Output() onDelete: EventEmitter<number> = new EventEmitter();
  @Input() review!: Review;

  constructor(
    public userService: UserService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {}

  deleteReview() {
    this.reviewService.deleteReview(this.review.id).subscribe();
    this.onDelete.emit(this.review.id);
  }
}
