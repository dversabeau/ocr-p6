import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {Session} from "../interfaces/session.interface";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public isLogged = sessionStorage.getItem("token") !== undefined;
  public session: Session | undefined;

  private isLoggedSubject = new BehaviorSubject<boolean>(this.isLogged);

  public $isLogged(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }

  public logIn(user: Session): void {
    this.session = user;
    sessionStorage.setItem("token", this.session.token)
    this.isLogged = true;
    this.next();
  }

  public logOut(): void {
    this.session = undefined;
    sessionStorage.removeItem("token")
    this.isLogged = false;
    this.next();
  }

  private next(): void {
    this.isLoggedSubject.next(this.isLogged);
  }
}
