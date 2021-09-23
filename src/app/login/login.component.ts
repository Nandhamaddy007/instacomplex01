import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor() {}
  Email = new FormControl('', [Validators.required, Validators.email]);
  OTP = new FormControl('', [Validators.required]);
  ngOnInit() {}
  SendOTP() {}
  SubmitOTP() {}
}
