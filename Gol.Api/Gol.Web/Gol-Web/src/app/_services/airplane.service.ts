import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Airplane } from "../_models/Airplane";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: "root"
})
export class AirplaneService {

  baseUrl: string = `${environment.ApiUrl}/airplane`;

  constructor(private http: HttpClient) {}

  getAllAirplanes(): Observable<Airplane[]> {
    return this.http.get<Airplane[]>(this.baseUrl);
  }

  getAirplaneById(id: number): Observable<Airplane> {
    return this.http.get<Airplane>(`${this.baseUrl}/GetById/${id}`);
  }

  getAirplaneByAny(search: string): Observable<Airplane[]> {
    return this.http.get<Airplane[]>(`${this.baseUrl}/find/${search}`);
  }

  saveAirplane(airplaneModel: Airplane) {
    return this.http.post(this.baseUrl, airplaneModel);
  }

  editAirplane(airplaneModel: Airplane) {
    return this.http.put(this.baseUrl, airplaneModel);
  }

  deleteAirplane(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
