import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

login() {
  this.http.post<any>('http://localhost:3000/login', {
    username: this.username,
    password: this.password
  }).subscribe({
    next: res => {
      if (res.success) {
        // Armazena um flag simples (só para a demo)
        localStorage.setItem('logado', 'true');
        localStorage.setItem('userName',  this.username);
        this.router.navigate(['/']);
      } else {
        this.errorMessage = 'Usuário ou senha inválidos.';
      }
    },
    error: () => {
      this.errorMessage = 'Usuário ou senha inválidos.';
    }
  });
}

}
