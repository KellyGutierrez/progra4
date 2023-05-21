import { Component, OnInit } from "@angular/core";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { UserService } from "app/shared/services/user.service";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Router } from "@angular/router";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})

export class UsersComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}
  users: any = [];
  userId: string;

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (response) => {
        if (response.code === 200) {
          this.users = response.data;
        }
      },
      (error) => {
        console.log("Error en el servidor.");
      }
    );
  }
  
  
  setUserId(userId: string) {
    this.userId = userId;
  }

  public ColumnMode = ColumnMode;

  deleteUser(id: string): void {
    this.userService.deleteUser(id).subscribe(
      (response) => {
        if (response.code === 200) {
          // Actualizar la lista de usuarios
          this.userService.getUsers().subscribe(
            (response) => {
              if (response.code === 200) {
                this.users = response.data;
              }
            },
            (error) => {
              Swal.fire({
                title: "Ocurrió un error",
                icon: "error",
                confirmButtonText: "Volver",
              });
            }
          );
        }
      },
      (error) => {
        Swal.fire({
          title: "Ocurrió un error",
          icon: "error",
          confirmButtonText: "Volver",
        });
      }
    );
  }
  async deleteAlert(userId: string) {
    const { value: id } = await Swal.fire({
      title: "Ingrese el ID del usuario a borrar",
      input: "text",
      inputLabel: "ID",
      inputPlaceholder: "Número de ID",
      icon: "warning",
      inputAttributes: {
        maxlength: 10,
        autocapitalize: "off",
        autocorrect: "off",
      },
    });
    if (id === this.userId) {
      this.deleteUser(userId);
      Swal.fire({
        title: "Usuario eliminado",
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "ID inválida",
        icon: "error",
      });
    }
  }
  adduser() {
    this.router.navigate(["exercises/adduser"]);
  }
  update(userId: string, name: string, rollNumber: string, email: string, password: string) {
    const queryParams = {
      userId: userId,
      name: name,
      rollNumber: rollNumber,
      email: email,
      password: password
    };
    this.router.navigate(["/exercises/edituser"], { queryParams: queryParams });
  }
}
