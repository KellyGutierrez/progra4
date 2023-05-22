import { Component, OnInit } from "@angular/core";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { CityService } from "app/shared/services/city.service";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Router } from "@angular/router";
import { EdgeService } from "app/shared/services/edge.service";

@Component({
  selector: "app-cities",
  templateUrl: "./cities.component.html",
  styleUrls: ["./cities.component.scss"],
})
export class CitiesComponent implements OnInit {
  constructor(
    private cityService: CityService,
    private router: Router,
    private edgeService: EdgeService
  ) {}
  citiesList: any = [];
  edges: any = [];
  cityId: number;

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
    this.edgeService.getEdges().subscribe(
      (response) => {
        if (response.code === 200) {
          this.edges = response.data;
        }
      },
      (error) => {
        console.log("Error en el servidor.");
      }
    );
  }
  setCityId(cityId: number) {
    this.cityId = cityId;
  }
  public ColumnMode = ColumnMode;

  deleteCity(id: number): void {
    this.cityService.deleteCity(id).subscribe(
      (response) => {
        if (response.code === 200) {
          // Actualizar la lista de usuarios
          this.cityService.getCities().subscribe(
            (response) => {
              if (response.code === 200) {
                this.citiesList = response.data;
              }
            },
            (error) => {
              Swal.fire({
                title: "Ocurrió un errooor",
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
  async deleteAlert(cityId: number) {
    let flag = true;
    for (let edge of this.edges) {
      if (edge.origin == this.cityId || edge.detiny == this.cityId) {
        flag = false;
        break;
      }
    }
    if (flag) {
      const { value: id } = await Swal.fire({
        title: "Para borrar ingrese el ID",
        input: "text",
        inputLabel: "ID",
        inputPlaceholder: "123",
        icon: "warning",
        inputAttributes: {
          maxlength: 10,
          autocapitalize: "off",
          autocorrect: "off",
        },
      });
      if (id == this.cityId) {
        this.deleteCity(cityId);
        Swal.fire({
          title: "Se eliminó la ciudad",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "ID incorrecta",
          icon: "error",
        });
      }
    } else {
      Swal.fire({
        title: "Esta acción no se puede realziar",
        text: "Hay aristas relacionadas con estas ciudes",
        icon: "error",
      });
    }
  }
  add() {
    this.router.navigate(["exercises/addcity"]);
  }
  update(cityId: number, name: string) {
    const queryParams = {
      cityId: cityId,
      name: name,
    };
    this.router.navigate(["/exercises/editcity"], { queryParams: queryParams });
  }
}