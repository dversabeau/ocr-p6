import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Theme} from "../interfaces/theme.interface";

@Injectable({
  providedIn: 'root'
})
export class ThemeApiService{
  private pathService = '/api/topic';

  constructor(private httpClient: HttpClient) {
  }

  public all(): Observable<Theme[]> {
    return this.httpClient.get<Theme[]>(this.pathService)
  }

  public allNoSubscribed(): Observable<Theme[]> {
    return this.httpClient.get<Theme[]>(this.pathService + "/no-subscribed")
  }

  public allSubscribe(): Observable<Theme[]> {
    return this.httpClient.get<Theme[]>(this.pathService + "/subscribed")
  }
}
