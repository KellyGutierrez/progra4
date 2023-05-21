import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GenericResponse } from "../interfaces/interfaces";
import { environment } from "environments/environment";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  private env: any = environment;

  constructor(private client: HttpClient) {}

  public login(user, pwd): Observable<GenericResponse> {
    const body = { username: user, password: pwd };
    return this.client.post<GenericResponse>(this.env.baseUrl + "/login", body);
  }
}
