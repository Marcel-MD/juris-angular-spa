import { Component, Input, OnInit } from '@angular/core';
import { ListProfile } from 'src/app/models/profile/list-profile';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css'],
})
export class ProfileCardComponent implements OnInit {
  @Input() profile!: ListProfile;
  imageUrl: string = '';

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.imageUrl = this.profileService.getProfileImageUrl(
      this.profile.imageName
    );
  }

  getImageUrl() {
    if (this.profile.imageName) {
      return this.profileService.getProfileImageUrl(this.profile.imageName);
    }
    return '/assets/sample-profile.png';
  }
}
