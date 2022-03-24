import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private AuthService: AuthService, private router: Router) {}
  Email = new FormControl('', [Validators.required, Validators.email]);
  OTP = new FormControl('', [Validators.required]);
  ngOnInit() {
    var check = localStorage.getItem('token');
    if (check) {
      alert('Already logged in...');
      this.router.navigate(['complex']);
    }
  }
  SendOTP() {
    this.AuthService.GenerateOTP(this.Email.value).subscribe(
      (data) => {
        console.log(data);
        alert(data.Msg);
      },
      (err) => {
        console.log('error: ', err);
        alert(err.error.Msg);
      }
    );
  }
  SubmitOTP() {
    this.AuthService.ValidateLogin(this.OTP.value, this.Email.value);
  }
  forceLogout() {
    console.log('force initiated');
    this.AuthService.forceLogout(this.Email.value, this.OTP.value).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  check() {
    this.AuthService.checker().subscribe((data) => {
      console.log(data),
        (err) => {
          console.log(err);
        };
    });
  }
}
