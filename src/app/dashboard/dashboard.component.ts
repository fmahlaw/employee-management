import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isLogin: boolean ;

  constructor(private route: ActivatedRoute, private  AuthService : AuthService ) {
    this.isLogin = this.AuthService.getLoginStatus();
  }
  ngOnInit(): void {
    // Check if the login status is passed in the navigation state
    if (!this.isLogin) {
      this.AuthService.logout();
      return
    }
  }

}
