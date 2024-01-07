import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {CommentService} from "../../../../services/comment.service";
import {ActivatedRoute} from "@angular/router";
import {Comment} from "../../../../interfaces/comment.interface";

@Component({
  selector: 'comment-list',
  templateUrl: './comment.list.component.html',
  styleUrls: ['./comment.list.component.scss'],
})
export class CommentListComponent implements OnInit {

  public id: string | null = "";
  public comment$: Observable<Comment[]> | undefined;

  constructor(private commentService: CommentService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.comment$ = this.commentService.findByPostId(this.id);
  }

}
