import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "app/shared/services/user.service";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.scss"],
})
export class AddUserComponent implements OnInit {
  id: string;
  name: string;
  role: string;
  email: string;
  password: string;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  add() {
    const user = {
      userId: this.id,
      name: this.name,
      rollNumber: this.role,
      password: this.password,
      email: this.email,
    };
    this.userService
      .addUser(user)
      .pipe(
        tap(
          (response) => {
            if (response.code === 200) {
              Swal.fire({
                title: "Usuario agregado",
                text: "Operación realizada con éxito",
                type: "success",
                icon: "success",
                confirmButtonText: "Volver",
              }).then((result) => {
                if (result.isConfirmed) {
                  this.router.navigate(["/exercises/users"]);
                }
              });
            } else {
              Swal.fire({
                title: "Error",
                text: "Un error ha ocurrido",
                icon: "error",
                confirmButtonText: "Volver",
              });
            }
          },
          (error) => {
            Swal.fire({
              icon: "Error",
              title: "Error en el servidor",
            });
          }
        )
      )
      .subscribe();
  }

  back() {
    this.router.navigate(["/exercises/users"]);
  }
}
