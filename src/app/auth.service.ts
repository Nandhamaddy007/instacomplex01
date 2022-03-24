import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendTalkerService } from './backend-talker.service';
import { environment } from '../environment';
@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient,
    private service: BackendTalkerService
  ) {}
  endpoint = environment.DevEndpoint;
  GenerateOTP(email: String): any {
    let enc = this.service.encryptData({ email: email.toLowerCase() });
    return this.http.post(this.endpoint + 'Auth/GetOtp', { body: enc });
  }
  ValidateLogin(PINOTP, email) {
    let enc = this.service.encryptData({ pinotp: PINOTP, email: email });
    let b = { otp: enc };
    this.http.post(this.endpoint + 'Auth/SubmitOtp', b).subscribe({
      next: (data) => {
        console.log(data);
        console.log(this.service.decryptData(data['tkn']));
        localStorage.setItem('token', data['tkn']);
        localStorage.setItem('expiresIn', data['expiresIn']);
        localStorage.setItem('m', this.service.encryptData(data['m']));
        alert('Logged in successfully...');
        window.location.assign('/complex');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  forceLogout(email, pin): any {
    let pack = this.service.encryptData({ code: pin, email: email });
    let body = { body: pack };
    return this.http.patch(this.endpoint + 'Auth/setLogout', body);
  }
  Logout(email) {
    let pack = { body: this.service.encryptData({ email: email }) };
    return this.http.put(this.endpoint + 'Auth/Logout', pack);
  }
  isLoggedIn() {
    let token = this.service.decryptData(localStorage.getItem('token'));
  }
  getMail() {
    return this.service.decryptData(localStorage.getItem('m'));
  }
  removeLoginDetails() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('m');
  }
  checker() {
    return this.http.get(this.endpoint + 'secure/check');
  }
}
