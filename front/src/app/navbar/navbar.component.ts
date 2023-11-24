import {AuthService} from "../services/auth.service";
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  showButton: boolean = false;
  isLoginOrRegister: boolean = false;

  constructor(private authService: AuthService,
              private router: Router,
              private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe(['(max-width: 650px)'])
      .subscribe(result => {
        this.showButton = result.matches;
      });
    this.isLoggedIn = this.authService.isLoggedIn();
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

}
