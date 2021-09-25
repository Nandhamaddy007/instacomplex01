import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private AuthService: AuthService) {}
  Email = new FormControl('nandhamaddy007@gmail.com', [
    Validators.required,
    Validators.email,
  ]);
  OTP = new FormControl('GSno9841', [Validators.required]);
  ngOnInit() {}
  SendOTP() {
    this.AuthService.GenerateOTP(this.Email.value).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log('error: ', err);
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
