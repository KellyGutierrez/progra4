import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "app/shared/services/user.service";
import Swal from "sweetalert2/dist/sweetalert2.js";

@Component({
  selector: "app-edit-user",
  templateUrl: "./edit-user.component.html",
  styleUrls: ["./edit-user.component.scss"],
})
export class EditUserComponent implements OnInit {
  userId: string;
  name: string;
  rollNumber: string;
  email: string;
  password: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.queryParamMap.get("userId");
    this.name = this.route.snapshot.queryParamMap.get("name");
    this.rollNumber = this.route.snapshot.queryParamMap.get("rollNumber");
    this.email = this.route.snapshot.queryParamMap.get("email");
    this.password = this.route.snapshot.queryParamMap.get("password");
  }

  updateUser() {
    const user = {
      userId: this.userId,
      name: this.name, // Si no se cambia el nombre, usar el valor anterior
      rollNumber: this.rollNumber,
      email: this.email,
      password: this.password,
    };
    this.userService.updateUser(this.userId, user).subscribe(
      (response) => {
        if (response.code === 200) {
          Swal.fire({
            title: "Se guardaron los datos",
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
          title: "Error en el servidor",
          text: "Un error ha ocurrido",
          icon: "error",
          confirmButtonText: "Volver",
        });
      }
    );
  }

  back() {
    this.router.navigate(["/exercises/users"]);
  }
}
