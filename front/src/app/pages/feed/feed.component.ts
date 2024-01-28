import {Component, OnInit} from '@angular/core';
import {map, Observable} from "rxjs";
import {Post} from "../../interfaces/post.interface";
import {PostService} from "../../services/post.service";
import {Router} from "@angular/router";


interface Filter {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  filters: Filter[] = [
    {value: 1, viewValue: 'Date'},
    {value: 2, viewValue: 'Auteur'},
    {value: 3, viewValue: 'Titre de l\'article'},
  ];

  public post$: Observable<Post[]> = new Observable<Post[]>;

  public filteredAndSortedPosts$: Observable<Post[]> | undefined;

  selectedFilter: number = 1;

  constructor(
    private postService: PostService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.filterAndSortPosts();
  }

  public onFilterChange(): void {
    this.filterAndSortPosts();
  }

  private filterAndSortPosts(): void {
    this.post$ = this.postService.all();

    this.filteredAndSortedPosts$ = this.post$.pipe(
      map((posts) => {
        switch (this.selectedFilter) {
          case 1:
            // Tri par auteur (ordre alphabétique)
            return [...posts].sort((post1, post2) => post1.author.localeCompare(post2.author));

          case 2:
            // Tri par date (du plus récent au moins récent)
            return [...posts].sort((post1, post2) => new Date(post2.created_at).getTime() - new Date(post1.created_at).getTime());

          case 3:
            // Tri par titre de l'article (ordre alphabétique)
            return [...posts].sort((post1, post2) => post1.title.localeCompare(post2.title));

          default:
            // Aucun tri
            return posts;
        }
      })
    );
  }

  public postDetails(id: number | undefined): void {
    if (id != undefined) {
      this.router.navigate(['article/' + id + '/details']);
    }
  }

}
