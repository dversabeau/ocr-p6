import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RegisterRequest} from "../interfaces/registerRequest.interface";
import {Observable} from "rxjs";
import {LoginRequest} from "../interfaces/loginRequest.interface";
import {Session} from "../interfaces/session.interface";
import {MeInterface} from "../interfaces/me.interface";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private pathService = 'api/auth';

  constructor(private httpClient: HttpClient) {
  }

  public register(registerRequest: RegisterRequest): Observable<void> {
    return this.httpClient.post<void>(`${this.pathService}/register`, registerRequest);
  }

  public login(loginRequest: LoginRequest): Observable<Session> {
    return this.httpClient.post<Session>(`${this.pathService}/login`, loginRequest);
  }

  public update(meInterface: MeInterface): Observable<void> {
    return this.httpClient.post<void>(`${this.pathService}/update`, meInterface);
  }

  public me(): Observable<MeInterface> {
    return this.httpClient.get<MeInterface>(`${this.pathService}/me`);
  }
}
