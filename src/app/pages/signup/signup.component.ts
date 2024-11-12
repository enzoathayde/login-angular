import { Component } from "@angular/core";
import { DefaultLoginLayoutComponent } from "../../default-login-layout/default-login-layout.component";
import {
  Form,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { PrimaryInputComponent } from "../../primary-input/primary-input.component";
import { Router } from "@angular/router";
import { LoginService } from "../../services/login.service";
import { ToastrService } from "ngx-toastr";



interface signUpForm {
  name: FormControl,
  email: FormControl,
  password: FormControl,
  passwordConfirm: FormControl
}


@Component({
  selector: "app-signup",
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent,
  ],
  providers: [
    LoginService
  ],
  templateUrl: "./signup.component.html",
  styleUrl: "./signup.component.scss",
})



export class SignupComponent {
  signUpForm!: FormGroup<signUpForm>;

  constructor(private router: Router, private loginService: LoginService, private toastr: ToastrService) {
    this.signUpForm = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]),
      passwordConfirm: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  } 

  submit() {
    this.loginService.login(this.signUpForm.value.email, this.signUpForm.value.password).subscribe({
      next: () => this.toastr.success("Login efetuado com sucesso"),
      error: () => this.toastr.error("Erro inesperado, tente novamente mais tarde")
    })
  }

  navigate() {
   this.router.navigate(["/login"])
  }
}
