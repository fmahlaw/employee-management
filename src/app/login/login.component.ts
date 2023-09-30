import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = "";
  password: string = "";


  constructor(private router: Router,private AuthService: AuthService) { }

  login(): void {
    if (this.username === 'admin' && this.password === 'admin') {
      this.AuthService.setLoginStatus(true);
      this.router.navigate(['/list']);
    } else {
      alert('Invalid credentials. Please try again.');
    }
  }
}
