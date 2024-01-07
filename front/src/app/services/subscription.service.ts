import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService{
  private pathService = '/api/subscription';

  constructor(private httpClient: HttpClient) {
  }

  public subscription(themeId: number): Observable<void>{
    return this.httpClient.post<void>(`${this.pathService}/subscribe/${themeId}`, null);
  }

  public unsubscription(themeId: number): Observable<void>{
    return this.httpClient.post<void>(`${this.pathService}/unsubscribe/${themeId}`, null);
  }

}
