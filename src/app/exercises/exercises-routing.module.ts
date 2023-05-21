import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CalculatorComponent } from "./calculator/calculator.component";
import { DataTablesComponent } from "./data-tables/data-tables.component";
import { EditorComponent } from "./editor/editor.component";
import { GalleryComponent } from "./gallery/gallery.component";
import { OrganizationalComponent } from "./organizational/organizational.component";
import { UsersComponent } from "./users/users.component";
import { AddUserComponent } from "./users/add-user/add-user.component";
import { EditUserComponent } from "./users/edit-user/edit-user.component";
import { CitiesComponent } from "./cities/cities.component";
import { AddCityComponent } from "./cities/add-city/add-city.component";
import { EditCityComponent } from "./cities/edit-city/edit-city.component";
import { EdgesComponent } from "./edges/edges.component";
import { AddEdgeComponent } from "./edges/add-edge/add-edge.component";
import { EditEdgeComponent } from "./edges/edit-edge/edit-edge.component";
import { DijkstraComponent } from "./dijkstra/dijkstra.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "calculator",
        component: CalculatorComponent,
        data: {
          title: "Calculadora",
        },
      },
    ],
  },
  {
    path: "",
    children: [
      {
        path: "data-tables",
        component: DataTablesComponent,
        data: {
          title: "Data-Tables",
        },
      },
    ],
  },

  {
    path: "",
    children: [
      {
        path: "gallery",
        component: GalleryComponent,
        data: {
          title: "Galeria",
        },
      },
    ],
  },
  {
    path: "",
    children: [
      {
        path: "editor",
        component: EditorComponent,
        data: {
          title: "Editor",
        },
      },
    ],
  },
  {
    path: "",
    children: [
      {
        path: "organizational",
        component: OrganizationalComponent,
        data: {
          title: "Chart",
        },
      },
    ],
  },
  {
    path: "",
    children: [
      {
        path: "users",
        component: UsersComponent,
        data: {
          title: "Users",
        },
      },
    ],
  },
  {
    path: "",
    children: [
      {
        path: "adduser",
        component: AddUserComponent,
        data: {
          title: "Add User",
        },
      },
    ],
  },
  {
    path: "",
    children: [
      {
        path: "edituser",
        component: EditUserComponent,
        data: {
          title: "Edit User",
        },
      },
    ],
  },
  {
    path: "",
    children: [
      {
        path: "cities",
        component: CitiesComponent,
        data: {
          title: "Cities",
        },
      },
    ],
  },
  {
    path: "",
    children: [
      {
        path: "addcity",
        component: AddCityComponent,
        data: {
          title: "Add City",
        },
      },
    ],
  },
  {
    path: "",
    children: [
      {
        path: "editcity",
        component: EditCityComponent,
        data: {
          title: "Edit City",
        },
      },
    ],
  },
  {
    path: "",
    children: [
      {
        path: "edges",
        component: EdgesComponent,
        data: {
          title: "Edges",
        },
      },
    ],
  },
  {
    path: "",
    children: [
      {
        path: "addedge",
        component: AddEdgeComponent,
        data: {
          title: "Add Edge",
        },
      },
    ],
  },
  {
    path: "",
    children: [
      {
        path: "editedge",
        component: EditEdgeComponent,
        data: {
          title: "Edit Edge",
        },
      },
    ],
  },
  {
    path: "",
    children: [
      {
        path: "dijkstra",
        component: DijkstraComponent,
        data: {
          title: "Dijkstra",
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExercisesRoutingModule {}
