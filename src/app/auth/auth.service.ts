import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  // Set login status in localStorage
  setLoginStatus(status: boolean): void {
    localStorage.setItem('key', status.toString());
  }

  // Get login status from localStorage
  getLoginStatus(): boolean {
    const isLogin = localStorage.getItem('key');
    return isLogin ? isLogin === 'true' : false;
  }

  // Logout: clear login status
  logout(): void {
    localStorage.removeItem('key');
    this.router.navigate(['/login']);
  }
}
