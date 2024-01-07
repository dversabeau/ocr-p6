import {Component, OnInit} from '@angular/core';
import {mergeMap, Observable, of} from "rxjs";
import {Theme} from "../../../interfaces/theme.interface";
import {ThemeApiService} from "../../../services/theme-api.service";
import {SubscriptionService} from "../../../services/subscription.service";

@Component({
  selector: 'theme-list',
  templateUrl: './theme.list.component.html',
  styleUrls: ['./theme.list.component.scss'],
})
export class ThemeListComponent implements OnInit {
  public themes$: Observable<Theme[]> = this.themeApiService.allNoSubscribed();


  constructor(private themeApiService: ThemeApiService,
              private subscriptionService: SubscriptionService) {
  }

  ngOnInit(): void {

  }

  public subscribe(topicId: number | undefined): void {
    if (topicId) {
      this.subscriptionService
        .subscription(topicId)
        .pipe(
          mergeMap(() => this.themeApiService.allNoSubscribed())
        )
        .subscribe(
          (updatedThemes) => {
            this.themes$ = of(updatedThemes);
          }
        );
    }
  }

}
