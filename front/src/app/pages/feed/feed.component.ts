import { Component, OnInit } from '@angular/core';

interface Filter {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  filters: Filter[] = [
    {value: 'autor', viewValue: 'Auteur'},
    {value: 'date', viewValue: 'Date'},
    {value: 'title', viewValue: 'Titre de l\'article'},
  ];
  constructor() {}

  ngOnInit(): void {}

}
