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
  ValidateLogin(PINOTP, email): any {
    let enc = this.service.encryptData({ pinotp: PINOTP, email: email });
    let b = { otp: enc };
    return this.http.post(this.endpoint + 'Auth/SubmitOtp', b);
  }
}
