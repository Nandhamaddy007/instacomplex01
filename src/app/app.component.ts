import { Component, VERSION } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import firebase from 'firebase/app';
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
    // firebase.initializeApp({});
    this.ProfilePic = localStorage.getItem('picture');
  }
}
