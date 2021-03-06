import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  constructor(private http: HttpClient) {}

  private api = environment.api;

  getService(url: string): Observable<any> {
    return this.http.get<any>(this.api + url);
  }

  postService(url: string, data: any) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<any>(this.api + url, JSON.stringify(data), httpOptions);
  }

}
