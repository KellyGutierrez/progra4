import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ExercisesRoutingModule } from "./exercises-routing.module";
import { CalculatorComponent } from "./calculator/calculator.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { GalleryComponent } from "./gallery/gallery.component";
import { DataTablesComponent } from "./data-tables/data-tables.component";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { PipeModule } from "app/shared/pipes/pipe.module";
import { EditorComponent } from "./editor/editor.component";
import { QuillModule } from "ngx-quill";

import { OrganizationChartModule } from "primeng/organizationchart";
import { ToastModule } from "primeng/toast";
import { PanelModule } from "primeng/panel";
import { OrganizationalComponent } from "./organizational/organizational.component";
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { CitiesComponent } from './cities/cities.component';
import { AddCityComponent } from './cities/add-city/add-city.component';
import { EditCityComponent } from './cities/edit-city/edit-city.component';
import { EdgesComponent } from './edges/edges.component';
import { AddEdgeComponent } from './edges/add-edge/add-edge.component';
import { EditEdgeComponent } from './edges/edit-edge/edit-edge.component';
import { DijkstraComponent } from './dijkstra/dijkstra.component';

@NgModule({
  declarations: [
    CalculatorComponent,
    GalleryComponent,
    DataTablesComponent,
    EditorComponent,
    OrganizationalComponent,
    UsersComponent,
    AddUserComponent,
    EditUserComponent,
    CitiesComponent,
    AddCityComponent,
    EditCityComponent,
    EdgesComponent,
    AddEdgeComponent,
    EditEdgeComponent,
    DijkstraComponent,
  ],
  imports: [
    CommonModule,
    OrganizationChartModule,
    ToastModule,
    PanelModule,
    FormsModule,
    ExercisesRoutingModule,
    PipeModule,
    NgxDatatableModule,
    QuillModule.forRoot(),
    ReactiveFormsModule,
    NgbModule,
  ],
})
export class ExercisesModule {}
