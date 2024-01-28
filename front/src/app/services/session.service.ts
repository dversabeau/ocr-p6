import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Session} from "../interfaces/session.interface";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public isLogged = false;
  public session: Session | undefined;

  public logIn(user: Session): void {
    this.session = user;
    sessionStorage.setItem("token", this.session.token)
    this.isLogged = true;
  }

  public logOut(): void {
    this.session = undefined;
    sessionStorage.removeItem("token")
    this.isLogged = false;
  }

}
