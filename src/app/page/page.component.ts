import { Component, OnInit } from "@angular/core";
import { UserService } from "app/shared/services/user.service";

@Component({
  selector: "app-page",
  templateUrl: "./page.component.html",
  styleUrls: ["./page.component.scss"],
})
export class PageComponent implements OnInit {
  constructor() {}
  users: any = [];

  ngOnInit(): void {
  }
}
