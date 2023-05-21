import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GenericResponse } from "../interfaces/interfaces";
import { environment } from "environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private env: any = environment;

  constructor(private client: HttpClient) {}

  public getHeadersRESTToken(): HttpHeaders {
    let headers = new HttpHeaders();
    let token = localStorage.getItem("token");
    headers = headers
      .set("Content-Type", "application/json")
      .set("Authorization", token);
    return headers;
  }
  public getCityById(id: string): Observable<GenericResponse> {
    return this.client.get<GenericResponse>(this.env.baseUrl + `/city/${id}`, {
      headers: this.getHeadersRESTToken(),
    });
  }

  public getCities(): Observable<GenericResponse> {
    return this.client.get<GenericResponse>(this.env.baseUrl + "/city", {
      headers: this.getHeadersRESTToken(),
    });
  }

  public addCity(city: any): Observable<GenericResponse> {
    return this.client.post<GenericResponse>(
      this.env.baseUrl + "/addcity",
      city,
      {
        headers: this.getHeadersRESTToken(),
      }
    );
  }

  public deleteCity(id: string): Observable<GenericResponse> {
    return this.client.delete<GenericResponse>(this.env.baseUrl + `/city/${id}`, {
      headers: this.getHeadersRESTToken(),
    });
  }
  public updateUser(id: string, name: any): Observable<GenericResponse> {
    return this.client.put<GenericResponse>(
      this.env.baseUrl + `/update/city/${id}`,
      name,
      {
        headers: this.getHeadersRESTToken(),
      }
    );
  }
}