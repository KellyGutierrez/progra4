import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GenericResponse } from "../interfaces/interfaces";
import { environment } from "environments/environment";

@Injectable({
  providedIn: "root",
})
export class UserService {
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
  public getUserById(id: string): Observable<GenericResponse> {
    return this.client.get<GenericResponse>(this.env.baseUrl + `/${id}`, {
      headers: this.getHeadersRESTToken(),
    });
  }

  public getUsers(): Observable<GenericResponse> {
    return this.client.get<GenericResponse>(this.env.baseUrl + "/user", {
      headers: this.getHeadersRESTToken(),
    });
  }

  public addUser(user: any): Observable<GenericResponse> {
    return this.client.post<GenericResponse>(
      this.env.baseUrl + "/adduser",
      user,
      {
        headers: this.getHeadersRESTToken(),
      }
    );
  }

  public deleteUser(id: string): Observable<GenericResponse> {
    return this.client.delete<GenericResponse>(this.env.baseUrl + `/${id}`, {
      headers: this.getHeadersRESTToken(),
    });
  }
  public updateUser(id: string, user: any): Observable<GenericResponse> {
    return this.client.put<GenericResponse>(
      this.env.baseUrl + `/update/${id}`,
      user,
      {
        headers: this.getHeadersRESTToken(),
      }
    );
  }
}
