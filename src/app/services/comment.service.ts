import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from '../interfaces/Response';
import { Comment } from '../interfaces/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseApiUrl = environment.baseAPIURL
  private ApiUrl = `${this.baseApiUrl}api/moments` 

  constructor(private readonly http: HttpClient) { }
  createComments (data: Comment): Observable<Response<Comment>> {
    const url = `${this.ApiUrl}/${data.momentId}/comments`
    return this.http.post<Response<Comment>>(url, data)
  }
}
