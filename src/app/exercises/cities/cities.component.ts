import { Component, OnInit } from "@angular/core";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { CityService } from "app/shared/services/city.service";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Router } from "@angular/router";

@Component({
  selector: "app-cities",
  templateUrl: "./cities.component.html",
  styleUrls: ["./cities.component.scss"],
})
export class CitiesComponent implements OnInit {
  constructor(private cityService: CityService, private router: Router) {}
  cities: any = [];
  cityId: string;

  ngOnInit(): void {
    this.cityService.getCities().subscribe(
      (response) => {
        if (response.code === 200) {
          this.cities = response.data;
        }
      },
      (error) => {
        console.log("Error en el servidor.");
      }
    );
  }
  setCityId(cityId: string) {
    this.cityId = cityId;
  }
  public rows = [this.cities];
  public columns = [
    { name: "ID", prop: "cityId" },
    { name: "Name", prop: "name" },
  ];
  public ColumnMode = ColumnMode;

  deleteCity(id: string): void {
    this.cityService.deleteCity(id).subscribe(
      (response) => {
        if (response.code === 200) {
          // Actualizar la lista de usuarios
          this.cityService.getCities().subscribe(
            (response) => {
              if (response.code === 200) {
                this.cities = response.data;
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
  async deleteAlert(cityId: string) {
    const { value: id } = await Swal.fire({
      title: "Ingrese el ID de la ciudad a borrar",
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
    if (id === this.cityId) {
      this.deleteCity(cityId);
      Swal.fire({
        title: "Ciudad eliminada",
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "ID inválida",
        icon: "error",
      });
    }
  }
  add() {
    this.router.navigate(["exercises/addcity"]);
  }
  update(cityId: string, name: string) {
    const queryParams = {
      cityId: cityId,
      name: name,
    };
    this.router.navigate(["/exercises/editcity"], { queryParams: queryParams });
  }
}
