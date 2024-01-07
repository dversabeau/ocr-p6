import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Post} from "../../interfaces/post.interface";
import {PostService} from "../../services/post.service";
import {Router} from "@angular/router";


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

  public post$: Observable<Post[]> = this.postService.all();

  constructor(
    private postService: PostService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  public postDetails(id: number | undefined): void {
    if (id != undefined) {
      this.router.navigate(['article/' + id + '/details']);
    }
  }
}
