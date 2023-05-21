import { Component } from "@angular/core";
import {
  NgForm,
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { LoginService } from "app/shared/auth/login.service";
import Swal from "sweetalert2/dist/sweetalert2.js";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
})
export class LoginPageComponent {
  loginFormSubmitted = false;
  isLoginFailed = false;

  loginForm = new UntypedFormGroup({
    username: new UntypedFormControl("guest@apex.com", [Validators.required]),
    password: new UntypedFormControl("Password", [Validators.required]),
    rememberMe: new UntypedFormControl(true),
  });

  constructor(
    private router: Router,
    private loginService: LoginService,
    private spinner: NgxSpinnerService
  ) {}

  get lf() {
    return this.loginForm.controls;
  }
  // On submit button click
  onSubmit() {
    this.loginFormSubmitted = true;
    if (this.loginForm.invalid) {
      return null;
    }
    this.spinner.show(undefined, {
      type: "ball-triangle-path",
      size: "medium",
      bdColor: "rgba(0, 0, 0, 0.8)",
      color: "#fff",
      fullScreen: true,
    });
    let user = this.loginForm.value;
    this.loginService.login(user.username, user.password).subscribe(
      (response) => {
        if (response.code === 200) {
          localStorage.setItem("token", response.data);
          this.spinner.hide();
          this.router.navigate(["/page"]);
        } else {
          Swal.fire({
            title: "Error",
            text: "Dato inválidos",
            icon: "error",
            confirmButtonText: "Cancelar",
          });
          this.spinner.hide();
        }
      },
      (error) => {
        Swal.fire({
          text: "Error en el servidor. Comuníquese con el administrador.",
          icon: "warning",
        });
        this.spinner.hide();
      }
    );
  }
  forgotpassword() {
    this.router.navigate(["/pages/forgot-password"]);
  }
}
