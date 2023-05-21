import { Component, OnInit } from "@angular/core";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { EdgeService } from "app/shared/services/edge.service";
import { CityService } from "app/shared/services/city.service";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Router } from "@angular/router";

@Component({
  selector: "app-edges",
  templateUrl: "./edges.component.html",
  styleUrls: ["./edges.component.scss"],
})
export class EdgesComponent implements OnInit {
  cities: any = [];
  edges: any = [];
  edgeId: string;

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
  setEdgeId(edgeId: string) {
    this.edgeId = edgeId;
  }
  public rows = [this.edges];
  public columns = [
    { name: "ID", prop: "edgeId" },
    { name: "Origen", prop: "origin" },
    { name: "Weight", prop: "weight" },
    { name: "Destino", prop: "destiny" },
  ];
  public ColumnMode = ColumnMode;

  deleteEdge(id: string): void {
    this.edgeService.deleteEdge(id).subscribe(
      (response) => {
        if (response.code === 200) {
          // Actualizar la lista de usuarios
          this.edgeService.getEdges().subscribe(
            (response) => {
              if (response.code === 200) {
                this.edges = response.data;
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
  async deleteAlert(edgeId: string) {
    const { value: id } = await Swal.fire({
      title: "Ingrese el ID de la arista a borrar",
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
    if (id === this.edgeId) {
      this.deleteEdge(edgeId);
      Swal.fire({
        title: "Arista eliminada",
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
    this.router.navigate(["exercises/addedge"]);
  }
  update(
    edgeId: string,
    originId: string,
    weight: number,
    destinyId: string
  ) {
    const newEdge = {
      edgeId: edgeId,
      origin: originId,
      weight: weight,
      destiny: destinyId,
    };
    this.router.navigate(["/exercises/editedge"], { queryParams: newEdge });
  }
  
}
