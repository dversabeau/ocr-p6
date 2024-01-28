import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {CommentService} from "../../../services/comment.service";
import {ActivatedRoute} from "@angular/router";
import {CommentEventService} from "./event/comment.event.service";

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {

  public id: string | null = "";
  public form = this.fb.group({
    commentContent: [
      '',
      [
        Validators.min(3),
      ]
    ],

  })

  constructor(private fb: FormBuilder,
              private commentService: CommentService,
              private route: ActivatedRoute,
              private commentEventService: CommentEventService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  public createComment(): void {
    const fb = this.form.value
    if (fb.commentContent && this.id) {
      this.commentService.createComment(this.id, fb.commentContent).subscribe({
          next: () => {
            this.form.get('commentContent')?.setValue('');
            this.commentEventService.emitCommentCreated();
          }
        }
      );
    }
  }

}
