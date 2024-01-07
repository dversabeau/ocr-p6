import {Component, OnInit} from '@angular/core';
import {SessionService} from "../../services/session.service";
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {MeInterface} from "../../interfaces/me.interface";
import {Observable} from "rxjs";

@Component({
  selector: 'post-list',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss'],
})
export class MeComponent implements OnInit {
  public me$: Observable<MeInterface> = this.authService.me()
  public onError = false;
  public onSuccess = false;
  public form = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],
    username: [
      '',
      [
        Validators.required,
        Validators.min(3)
      ]
    ]
  });

  constructor(private sessionService: SessionService,
              private router: Router,
              private authService: AuthService,
              private fb: FormBuilder,) {
  }

  ngOnInit() {
    this.me$.subscribe(me => {
      this.form.patchValue({
        username: me.username,
        email: me.email,
      });
    });
  }

  public logOut(): void {
    this.sessionService.logOut();
    this.router.navigate(['/']);
  }

  public submit(): void {
    const meInterface = this.form.value as MeInterface;
    this.authService.update(meInterface).subscribe({
      next: () => {
        this.onSuccess = true;
      },
      error: error => this.onError = true,
    });
  }


}
