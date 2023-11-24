import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RegisterRequest} from "../interfaces/registerRequest.interface";
import {Observable, tap} from "rxjs";
import {LoginRequest} from "../interfaces/loginRequest.interface";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;
  private pathService = 'api/auth';

  constructor(private httpClient: HttpClient) { }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  public register(registerRequest: RegisterRequest): Observable<void> {
    return this.httpClient.post<void>(`${this.pathService}/register`, registerRequest);
  }

  //TODO : récuperer le feed de l'utilisateur
  public login(loginRequest: LoginRequest): Observable<void> {
    return this.httpClient.post<void>(`${this.pathService}/login`, loginRequest).pipe(
      tap(() => {
        this.isAuthenticated = true;
      })
    );
  }

  logout(): void {
    // TODO : faire la méthode deconnexion
    this.isAuthenticated = false;
  }
}
