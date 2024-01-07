import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {Observable} from "rxjs";
import {Post} from "../../../interfaces/post.interface";
import {ThemeApiService} from "../../../services/theme-api.service";
import {Theme} from "../../../interfaces/theme.interface";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {PostService} from "../../../services/post.service";

@Component({
  selector: 'post-form',
  templateUrl: './post.form.component.html',
  styleUrls: ['./post.form.component.scss'],
})
export class PostFormComponent implements OnInit {

  public themes$: Observable<Theme[]> = this.themeService.all();
  public onError = false;

  public form = this.fb.group({
    selectedTheme: [null, Validators.required],
    postTitle: [
      '',
      [
        Validators.required,
        Validators.min(3),
        Validators.max(200)
      ]
    ],
    postContent: [
      '',
      [
        Validators.required,
        Validators.min(3),
      ]
    ],

  })

  constructor(private location: Location,
              private fb: FormBuilder,
              private router: Router,
              private themeService: ThemeApiService,
              private postService: PostService) {
  }

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }

  public createPost(): void {
    const fb = this.form.value
    if (fb.selectedTheme) {
      const post: Post = {
        author: "",
        content: fb.postContent ? fb.postContent : "",
        created_at: new Date(),
        id_topic: (fb.selectedTheme as Theme).id_topic,
        title: fb.postTitle ? fb.postTitle : "",
        topic: (fb.selectedTheme as Theme).title
      }
      this.postService.create(post).subscribe({
          next: (_: void) => this.router.navigate(['/feed']),
          error: _ => this.onError = true,
        }
      );
    }
  }

}
