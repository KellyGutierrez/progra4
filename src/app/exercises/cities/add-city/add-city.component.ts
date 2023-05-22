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
  id: number;
  name: string;
  citiesList: any = [];
  constructor(private cityService: CityService, private router: Router) {}

  ngOnInit(): void {
    this.cityService.getCities().subscribe(
      (response) => {
        if (response.code === 200) {
          this.citiesList = response.data;
        }
      },
      (error) => {
        console.log("Error en el servidor.");
      }
    );
  }

  add() {
    let flag = true;
    for (let city of this.citiesList) {
      if (this.id == city.cityId) {
        flag = false;
        break;
      }
    }
    if (flag === true) {
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
                  title: "Se agregó la ciudad",
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
    } else {
      Swal.fire({
        title: "Esta ID ya existe",
        icon: "error",
        confirmButtonText: "Volver",
      });
    }
  }

  back() {
    this.router.navigate(["/exercises/cities"]);
  }
}