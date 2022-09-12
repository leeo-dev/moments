import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Moment } from '../interfaces/Moment';
import { environment } from 'src/environments/environment';
import { Response } from '../interfaces/Response';

@Injectable({
  providedIn: 'root'
})
export class MomentService {
  private baseAPIURL = environment.baseAPIURL
  private apiURL = `${this.baseAPIURL}api/moments`

  constructor(private readonly http: HttpClient) { }
  getMoments(): Observable<Response<Moment[]>> {
    return this.http.get<Response<Moment[]>>(this.apiURL)
  }
  getMoment(id: number): Observable<Response<Moment>> {
    const url = `${this.apiURL}/${id}`
    return this.http.get<Response<Moment>>(url)
  }
  createMoment (formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.apiURL, formData)
  }

  removeMoment(id: number) {
    const url = `${this.apiURL}/${id}`
    return this.http.delete<Response<Moment>>(url)
  }

  updateMoment(id: number, formData: FormData): Observable<FormData>{
    const url = `${this.apiURL}/${id}`
    return this.http.put<FormData>(url, formData)
  }
}
