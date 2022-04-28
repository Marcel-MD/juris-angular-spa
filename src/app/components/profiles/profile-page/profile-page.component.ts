import {Component, OnInit} from '@angular/core';
import {Profile} from "src/app/models/profile/profile";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "src/app/services/user.service";
import {ProfileService} from "src/app/services/profile.service";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  profile?: Profile = undefined;

  constructor(private route: ActivatedRoute, public userService: UserService, private profileService: ProfileService) {
  }

  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get('id'));

    this.profileService.getProfileById(id).subscribe(profile => {
      this.profile = profile;
    })
  }

}
