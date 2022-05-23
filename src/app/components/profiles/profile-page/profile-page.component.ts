import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/profile/profile';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ProfileStatusEnum } from 'src/app/models/enums/profile-status.enum';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  profileId?: number;
  profile?: Profile = undefined;
  statusEnum = ProfileStatusEnum;
  pageNumber = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public userService: UserService,
    private profileService: ProfileService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    this.profileId = id;
    if (id == 0) return;
    this.profileService.getProfileById(id).subscribe((profile) => {
      this.profile = profile;
      this.profile.reviews = [];
      this.getReviews();
    });
  }

  getImageUrl() {
    if (this.profile && this.profile.imageName) {
      return this.profileService.getProfileImageUrl(this.profile.imageName);
    }
    return 'assets/sample-profile.png';
  }

  deleteProfile() {
    if (!this.profile) return;
    this.profileService.deleteProfile(this.profile.id).subscribe(() => {
      this.userService.updateProfileId(0);
      this.router.navigate(['/']).then(() => {
        window.location.reload();
      });
    });
  }

  setStatus(status: ProfileStatusEnum) {
    if (!this.profile) return;
    this.profileService.setProfileStatus(this.profile.id, status).subscribe();
    this.profile.status = status;
  }

  deleteReview(id: number) {
    if (!this.profile) return;
    this.profile.reviews = this.profile.reviews.filter((r) => r.id != id);
  }

  createNewProfile() {
    this.profileService.createEmptyProfile().subscribe((p) => {
      this.userService.updateProfileId(p.id);
      this.router.navigate([`/profile/${p.id}/update`]).then(() => {
        window.location.reload();
      });
    });
  }

  getReviews() {
    if (!this.profile) return;
    this.reviewService
      .getReviews(this.profile.id, { pageNumber: this.pageNumber })
      .subscribe((r) => {
        if (this.profile) this.profile.reviews = r;
      });
  }

  nextPage() {
    if (!this.profile) return;
    if (this.profile.reviews.length < 6 || !this.pageNumber) return;
    this.pageNumber++;
    this.getReviews();
  }

  previousPage() {
    if (!this.profile) return;
    if (!this.pageNumber || this.pageNumber < 2) return;
    this.pageNumber--;
    this.getReviews();
  }
}
