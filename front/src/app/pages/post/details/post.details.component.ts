import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";

@Component({
  selector: 'post-details',
  templateUrl: './post.details.component.html',
  styleUrls: ['./post.details.component.scss'],
})
export class PostDetailsComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit(): void {}

  goBack(): void {
    this.location.back();
  }

}
