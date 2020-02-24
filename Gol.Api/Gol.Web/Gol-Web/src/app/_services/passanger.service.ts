import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Passanger } from '../_models/Passanger';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PassangerService {

  baseUrl: string = `${environment.ApiUrl}/passanger`;

  constructor(private http: HttpClient) {}

  getAllPassangers(): Observable<Passanger[]> {
    return this.http.get<Passanger[]>(this.baseUrl);
  }

  getPassangerById(id: number): Observable<Passanger> {
    return this.http.get<Passanger>(`${this.baseUrl}/GetById/${id}`);
  }

  getPassangerByAny(search: string): Observable<Passanger[]> {
    return this.http.get<Passanger[]>(`${this.baseUrl}/Find/${search}`);
  }

  savePassanger(airplaneModel: Passanger) {
    return this.http.post(this.baseUrl, airplaneModel);
  }

  editPassanger(airplaneModel: Passanger) {
    return this.http.put(this.baseUrl, airplaneModel);
  }

  deletePassanger(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}
