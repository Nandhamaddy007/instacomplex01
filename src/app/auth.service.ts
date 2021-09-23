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
  GenerateOTP(email) {
    let enc = this.service.encryptData(email);
    this.http.get(this.endpoint + '/Auth/GetOtp/' + enc);
  }
  ValidateLogin() {}
}
