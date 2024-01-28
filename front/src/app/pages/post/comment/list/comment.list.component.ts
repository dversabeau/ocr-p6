import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {CommentService} from "../../../../services/comment.service";
import {ActivatedRoute} from "@angular/router";
import {Comment} from "../../../../interfaces/comment.interface";
import {CommentEventService} from "../event/comment.event.service";

@Component({
  selector: 'comment-list',
  templateUrl: './comment.list.component.html',
  styleUrls: ['./comment.list.component.scss'],
})
export class CommentListComponent implements OnInit {

  public id: string | null = "";
  public comment$: Observable<Comment[]> | undefined;

  constructor(private commentService: CommentService,
              private route: ActivatedRoute,
              private commentEventService: CommentEventService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.comment$ = this.commentService.findByPostId(this.id);

    this.commentEventService.commentCreated$.subscribe(() => {
      this.reloadComments();
    })
  }

  reloadComments(): void {
    this.comment$ = this.commentService.findByPostId(this.id);
  }

}
