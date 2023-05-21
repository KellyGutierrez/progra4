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
  cityId: string;
  name: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cityService: CityService
  ) {}

  ngOnInit() {
    this.cityId = this.route.snapshot.queryParamMap.get("cityId");
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
            title: "Se guardaron los datos",
            text: "Operación realizada con éxito",
            type: "success",
            icon: "success",
            confirmButtonText: "Volver",
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(["/exercises/cities"]);
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
    this.router.navigate(["/exercises/cities"]);
  }
}
