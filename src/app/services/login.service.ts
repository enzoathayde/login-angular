import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/response.type';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrlLogin: string = "http://localhost:8080/auth/login"
  apiUrlRegister: string = "http://localhost:8080/auth/register"

  constructor(private httpClient: HttpClient) { }

    login(email: string, password: String) {
      return this.httpClient.post<LoginResponse>(this.apiUrlLogin, {email,password}).pipe(
        tap((value) => {
          sessionStorage.setItem("auth-token", value.token)
          sessionStorage.setItem("username", value.name)
        }
      ))
    }

    signup(name: string, email: string,  password: String, passwordConfirm: String) {
      return this.httpClient.post<LoginResponse>(this.apiUrlRegister, {email,password}).pipe(
        tap((value) => {
          sessionStorage.setItem("auth-token", value.token)
          sessionStorage.setItem("username", value.name)
        }
      ))
    }

  
  
}
