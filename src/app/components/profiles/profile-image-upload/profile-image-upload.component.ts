import { Component, Input, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile-image-upload',
  templateUrl: './profile-image-upload.component.html',
  styleUrls: ['./profile-image-upload.component.css'],
})
export class ProfileImageUploadComponent implements OnInit {
  @Input() profileId!: number;
  @Input() imageName?: string;
  imageUrl = 'assets/sample-profile.png';

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.imageUrl = this.getImageUrl(this.imageName);
  }

  getImageUrl(imageName?: string) {
    if (imageName) {
      return this.profileService.getProfileImageUrl(imageName);
    }
    return 'assets/sample-profile.png';
  }

  uploadFile(files: any) {
    if (files.length === 0) {
      return;
    }

    let file = <File>files[0];
    this.profileService
      .setProfileImage(this.profileId, file)
      .subscribe((imageName) => {
        this.imageUrl = this.getImageUrl(imageName);
      });
  }
}
