import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Comment} from "../interfaces/comment.interface";

@Injectable({
  providedIn: 'root'
})
export class CommentService{
  private pathService = '/api/comment';

  constructor(private httpClient: HttpClient) {
  }

  public findByPostId(id: string | null): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(this.pathService + "/post/" + id)
  }

  public createComment(id: string, content: string): Observable<void> {
    return this.httpClient.post<void>(this.pathService + "/post/" + id, content)
  }
}
