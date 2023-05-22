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
  edges: any =[];
  cities: any = [];
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
  ngOnInit(): void {
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

  add() {
    if (this.weight > 0) {
      if (this.origin === this.destiny) {
        Swal.fire({
          title: "El origen y el destino son iguales",
          icon: "error",
          confirmButtonText: "Volver",
        });
      } else {
        let flag = true;
        for (let edge of this.edges) {
          if (edge.origin == this.origin && edge.destiny == this.destiny || edge.origin == this.destiny && edge.destiny == this.origin) {
            flag = false;
            break;
          }
        }
        if (flag) {
          // No existe una arista con el mismo origen y destino, se puede agregar la nueva arista
          const edge = {
            edgeId: this.edgeId,
            origin: this.origin,
            weight: this.weight,
            destiny: this.destiny,
          };
          this.edgeService.addEdge(edge)
            .pipe(
              tap(
                (response) => {
                  if (response.code === 200) {
                    Swal.fire({
                      title: "Se agregó la arista",
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
        } else {
          Swal.fire({
            icon:"error",
            title:"Ruta existente"
          })
        }
      }
    } else {
      Swal.fire({
        title: "Peso inferior a 1",
        icon: "error",
        confirmButtonText: "Volver",
      });
    }
  }
  back() {
    this.router.navigate(["/exercises/edges"]);
  }
}