import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CityService } from "app/shared/services/city.service";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-add-city",
  templateUrl: "./add-city.component.html",
  styleUrls: ["./add-city.component.scss"],
})
export class AddCityComponent implements OnInit {
  id: string;
  name: string;
  constructor(private cityService: CityService, private router: Router) {}

  ngOnInit(): void {}

  add() {
    const city = {
      cityId: this.id,
      name: this.name,
    };
    this.cityService
      .addCity(city)
      .pipe(
        tap(
          (response) => {
            if (response.code === 200) {
              Swal.fire({
                title: "Ciudad agregada",
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
              icon: "Error",
              title: "Error en el servidor",
            });
          }
        )
      )
      .subscribe();
  }

  back() {
    this.router.navigate(["/exercises/cities"]);
  }
}
