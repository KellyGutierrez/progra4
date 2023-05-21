import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GenericResponse } from "../interfaces/interfaces";
import { environment } from "environments/environment";

@Injectable({
  providedIn: "root",
})
export class EdgeService {
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
  public getEdgeById(id: string): Observable<GenericResponse> {
    return this.client.get<GenericResponse>(this.env.baseUrl + `/edge/${id}`, {
      headers: this.getHeadersRESTToken(),
    });
  }

  public getEdges(): Observable<GenericResponse> {
    return this.client.get<GenericResponse>(this.env.baseUrl + "/edge", {
      headers: this.getHeadersRESTToken(),
    });
  }

  public addEdge(edge: any): Observable<GenericResponse> {
    return this.client.post<GenericResponse>(
      this.env.baseUrl + "/addedge",
      edge,
      {
        headers: this.getHeadersRESTToken(),
      }
    );
  }

  public deleteEdge(id: string): Observable<GenericResponse> {
    return this.client.delete<GenericResponse>(
      this.env.baseUrl + `/edge/${id}`,
      {
        headers: this.getHeadersRESTToken(),
      }
    );
  }
  public updateEdge(id: string, edge: any): Observable<GenericResponse> {
    return this.client.put<GenericResponse>(
      this.env.baseUrl + `/update/edge/${id}`,
      edge,
      {
        headers: this.getHeadersRESTToken(),
      }
    );
  }
}
