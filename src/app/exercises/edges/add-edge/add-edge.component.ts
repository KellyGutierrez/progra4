import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { EdgeService } from "app/shared/services/edge.service";
import { CityService } from "app/shared/services/city.service";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-add-edge",
  templateUrl: "./add-edge.component.html",
  styleUrls: ["./add-edge.component.scss"],
})
export class AddEdgeComponent implements OnInit {
  cities: any = [];
  countOrigin: number;
  countDestiny: number;
  edgeId: String;
  origin: any;
  weight: number;
  destiny: any;

  constructor(
    private edgeService: EdgeService,
    private router: Router,
    private cityService: CityService
  ) {
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
  getCity(originId: string, destinyId: string) {
    let countOrigin = 1;
    let countDestiny = 1;
    for (let city of this.cities) {
      if (originId === city.cityId) {
        this.origin = city;
        this.countOrigin = countOrigin;
      }
      countOrigin++;
    }
    for (let city of this.cities) {
      if (destinyId === city.cityId) {
        this.destiny = city;
        this.countDestiny = countDestiny;
      }
      countDestiny++;
    }
  }
  ngOnInit(): void {}

  add() {
    if (this.weight > 0) {
      if (this.origin === this.destiny) {
        Swal.fire({
          title: "Error",
          text: "Una arista no puede tener el mismo origen y destino",
          icon: "error",
          confirmButtonText: "Volver",
        });
      } else {
        this.getCity(this.origin, this.destiny);
        // Primero verifica si ya existe una arista con el mismo origen y destino
        this.edgeService.getEdges().subscribe(
          (response) => {
            if (response.code === 200) {
              const edges = response.data;
              const existingEdge = edges.find(
                (edge) =>
                  (edge.origin.cityId === this.origin.cityId &&
                    edge.destiny.cityId === this.destiny.cityId) ||
                  (edge.origin.cityId === this.destiny.cityId &&
                    edge.destiny.cityId === this.origin.cityId)
              );
              if (existingEdge) {
                // Ya existe una arista con el mismo origen y destino
                Swal.fire({
                  title: "Error",
                  text: "No puede existir más de una arista con la misma ruta",
                  icon: "error",
                  confirmButtonText: "Volver",
                });
              } else {
                // No existe una arista con el mismo origen y destino, se puede agregar la nueva arista
                const edge = {
                  edgeId: this.edgeId,
                  origin: this.countOrigin,
                  weight: this.weight,
                  destiny: this.countDestiny,
                };
                this.edgeService
                  .addEdge(edge)
                  .pipe(
                    tap(
                      (response) => {
                        if (response.code === 200) {
                          Swal.fire({
                            title: "Arista agregada",
                            text: "Operación realizada con éxito",
                            icon: "success",
                            confirmButtonText: "Volver",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              this.router.navigate(["/exercises/edges"]);
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
                          icon: "error",
                          title: "Error en el servidor",
                        });
                      }
                    )
                  )
                  .subscribe();
              }
            }
          },
          (error) => {
            console.log("Error en el servidor.");
          }
        );
      }
    } else {
      Swal.fire({
        title: "Error",
        text: "El peso mínimo de una arista debe ser 1",
        icon: "error",
        confirmButtonText: "Volver",
      });
    }
  }

  back() {
    this.router.navigate(["/exercises/edges"]);
  }
}
