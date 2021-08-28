import { Component, VERSION } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import firebase from 'firebase/app';
import fire from 'firebase';
import { BackendTalkerService } from './backend-talker.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  Shopname;
  ProfilePic;
  constructor(
    private route: ActivatedRoute,
    private service: BackendTalkerService
  ) {}
  ngOnInit() {
    firebase.initializeApp({})
    this.ProfilePic = localStorage.getItem('picture');
  }
  googleSignIn() {
    this.service
      .GoogleSiginIn()
      .then(result => {
        console.log('Success...\n', result);
        localStorage.setItem(
          'picure',
          result.additionalUserInfo.profile['picture']
        );
        this.ProfilePic = result.additionalUserInfo.profile['picture'];
      })
      .catch(err => {
        console.log('Error:\n', err);
      });
  }
  googleSignOut() {
    this.service
      .GoogleSignOut()
      .then(res => console.log(res), err => console.log(err));
  }
}
