import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Moment } from '../interfaces/Moment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MomentService {
  private baseAPIURL = environment.baseAPIURL
  private apiURL = `${this.baseAPIURL}api/moments`

  constructor(private readonly http: HttpClient) { }
  createMoment (formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.apiURL, formData)
  }
}
