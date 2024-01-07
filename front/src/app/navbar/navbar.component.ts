import {AuthService} from "../services/auth.service";
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {BreakpointObserver} from "@angular/cdk/layout";
import {SessionService} from "../services/session.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  showButton: boolean = false;
  isLoginOrRegister: boolean = false;
  sidenav: boolean = false;

  constructor(private authService: AuthService,
              private sessionService: SessionService,
              private router: Router,
              private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe(['(max-width: 650px)'])
      .subscribe(result => {
        this.showButton = result.matches;
      });
    this.isLoggedIn = this.sessionService.isLogged;
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if(event.url === '/register' || event.url === '/login' ){
          this.isLoginOrRegister = true;
        }
      }
    });
  }

  sidenavToggle(){
    this.sidenav = !this.sidenav;
  }

  public goToHome():void {
    this.router.navigate(['/']);
  }

}
