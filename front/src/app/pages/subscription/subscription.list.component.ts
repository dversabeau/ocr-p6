import { Component, OnInit } from '@angular/core';
import {SubscriptionService} from "../../services/subscription.service";
import {mergeMap, Observable, of} from "rxjs";
import {Theme} from "../../interfaces/theme.interface";
import {ThemeApiService} from "../../services/theme-api.service";

@Component({
  selector: 'subscription-list',
  templateUrl: './subscription.list.component.html',
  styleUrls: ['./subscription.list.component.scss'],
})
export class SubscriptionListComponent implements OnInit {
  public themes$: Observable<Theme[]> = this.themeApiService.allSubscribe();
  constructor(private themeApiService: ThemeApiService,
              private subscriptionService: SubscriptionService) {}

  ngOnInit(): void {}

  public unsubscribe(topicId: number | undefined): void {
    if (topicId) {
      this.subscriptionService
        .unsubscription(topicId)
        .pipe(
          mergeMap(() => this.themeApiService.allSubscribe())
        )
        .subscribe(
          (updatedThemes) => {
            this.themes$ = of(updatedThemes);
          }
        );
    }
  }

}
