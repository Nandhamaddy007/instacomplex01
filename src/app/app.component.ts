import { Component, VERSION } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import firebase from 'firebase/app';
// import * as fire from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
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
    private service: BackendTalkerService,
    // public auth: AngularFireAuth
  ) {}
  ngOnInit() {   
    this.ProfilePic = localStorage.getItem('picture');
  }
  GoogleSignIn(){
    //this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }
}
