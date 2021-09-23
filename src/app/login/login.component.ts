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
  Email = new FormControl('', [Validators.required, Validators.email]);
  OTP = new FormControl('', [Validators.required]);
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
  SubmitOTP() {}
}
