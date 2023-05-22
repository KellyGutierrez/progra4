import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { CityService } from "app/shared/services/city.service";
import Swal from "sweetalert2/dist/sweetalert2.js";

@Component({
  selector: "app-edit-city",
  templateUrl: "./edit-city.component.html",
  styleUrls: ["./edit-city.component.scss"],
})
export class EditCityComponent implements OnInit {
  cityId: number;
  name: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cityService: CityService
  ) {}

  ngOnInit() {
    this.cityId = parseInt(this.route.snapshot.queryParamMap.get("cityId"));
    this.name = this.route.snapshot.queryParamMap.get("name");
  }

  updateCity() {
    const city = {
      cityId: this.cityId,
      name: this.name, // Si no se cambia el nombre, usar el valor anterior
    };
    this.cityService.updateUser(this.cityId, this.name).subscribe(
      (response) => {
        if (response.code === 200) {
          Swal.fire({
            title: "Se actualizaron los datos de la ciudad",
            icon: "success",
            confirmButtonText: "Regresar",
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(["/exercises/cities"]);
            }
          });
        } else {
          Swal.fire({
            title: "Oops...",
            text: "Un error ha ocurrido",
            icon: "error",
            confirmButtonText: "Regresar",
          });
        }
      },
      (error) => {
        Swal.fire({
          title: "Error en el servidor",
          text: "Comuníquese con un administrador",
          icon: "error",
          confirmButtonText: "Regresar",
        });
      }
    );
  }

  back() {
    this.router.navigate(["/exercises/cities"]);
  }
}