import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {Observable} from "rxjs";
import {PostService} from "../../../services/post.service";
import {ActivatedRoute} from "@angular/router";
import {Post} from "../../../interfaces/post.interface";


@Component({
  selector: 'post-details',
  templateUrl: './post.details.component.html',
  styleUrls: ['./post.details.component.scss'],
})
export class PostDetailsComponent implements OnInit {

  public post$: Observable<Post> = new Observable<Post>();

  constructor(private location: Location,
              private postService: PostService,
              private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.post$ = this.postService.findById(Number(id));
  }

  goBack(): void {
    this.location.back();
  }

}
