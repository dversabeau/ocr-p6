import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../interfaces/post.interface";

@Injectable({
  providedIn: 'root'
})
export class PostService{
  private pathService = '/api/post';

  constructor(private httpClient: HttpClient) {
  }

  public all(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.pathService)
  }

  public create(post: Post): Observable<void> {
    return this.httpClient.post<void>(this.pathService, post)
  }

  public findById(id: number): Observable<Post> {
    return this.httpClient.get<Post>(this.pathService + "/" + id)
  }
}
