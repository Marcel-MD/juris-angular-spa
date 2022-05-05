import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/profile/profile';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ProfileStatusEnum } from 'src/app/models/enums/profile-status.enum';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  profileId?: number;
  profile?: Profile = undefined;
  statusEnum = ProfileStatusEnum;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public userService: UserService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    this.profileId = id;
    if (id == 0) return;
    this.profileService.getProfileById(id).subscribe((profile) => {
      this.profile = profile;
    });
  }

  getImageUrl() {
    if (this.profile && this.profile.imageName) {
      return this.profileService.getProfileImageUrl(this.profile.imageName);
    }
    return '/assets/sample-profile.png';
  }

  deleteProfile() {
    if (!this.profile) return;
    this.profileService.deleteProfile(this.profile.id).subscribe(() => {
      this.userService.updateProfileId(0);
      window.location.href = '/';
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
      window.location.href = `/profile/${p.id}/update`;
    });
  }
}
