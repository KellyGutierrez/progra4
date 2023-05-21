import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GenericResponse } from "../interfaces/interfaces";
import { environment } from "environments/environment";

@Injectable({
  providedIn: "root",
})
export class DijkstraService {
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
  public dijkstra(
    origin: number,
    destiny: number,
    data: any // Cambiar los parámetros edges y cities a data
  ): Observable<GenericResponse> {
    return this.client.post<GenericResponse>(
      this.env.baseUrl + `/dijkstra/${origin}/${destiny}`,
      data, // Pasar el objeto data en el cuerpo de la solicitud POST
      {
        headers: this.getHeadersRESTToken(),
      }
    );
  }  
}
