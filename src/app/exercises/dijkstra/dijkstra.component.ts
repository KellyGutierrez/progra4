import { Component, OnInit } from "@angular/core";
import { DijkstraService } from "app/shared/services/dijkstra.service";
import { CityService } from "app/shared/services/city.service";
import { EdgeService } from "app/shared/services/edge.service";
import Swal from "sweetalert2/dist/sweetalert2.js";

@Component({
  selector: "app-dijkstra",
  templateUrl: "./dijkstra.component.html",
  styleUrls: ["./dijkstra.component.scss"],
})
export class DijkstraComponent implements OnInit {
  lists: any = [];
  edges: any = [];
  cities: any = [];
  startId: string;
  endId: string;

  constructor(
    private dijkstraService: DijkstraService,
    private cityService: CityService,
    private edgeService: EdgeService
  ) {}

  ngOnInit(): void {
    this.cityService.getCities().subscribe(
      (response) => {
        if (response.code === 200) {
          this.cities = response.data;
          this.lists.push(this.cities);
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
          this.lists.push(this.edges);
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
  getCityId(id: string) {
    let count = 1;
    for (let city of this.cities) {
      if (city.cityId === id) {
        return count;
      }
      count++;
    }
  }
  getDijkstra() {
    const data = { cities: this.cities, edges: this.edges }; // Crear objeto con las propiedades cities y edges
    this.dijkstraService
      .dijkstra(
        this.getCityId(this.startId),
        this.getCityId(this.endId),
        data // Pasar el objeto data en lugar de this.cities y this.edges
      )
      .subscribe(
        (response) => {
          if (response.code === 200) {
            Swal.fire({
              title: "Operación exitosa",
              text: `El camino más corto es: ${response.data}`,
              icon: "success",
              confirmButtonText: "Volver",
            });
          }
        },
        (error) => {
          Swal.fire({
            title: "Error en el servidor",
            icon: "error",
            confirmButtonText: "Volver",
          });
        }
      );
  }  
}
