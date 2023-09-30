import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee-data/employee.service';
import { Employee } from '../employee-data/employee.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {
  employee: Employee | undefined;
  isLogin: Boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router, private AuthService: AuthService
  ) {
    this.isLogin = AuthService.getLoginStatus()

  }

  ngOnInit(): void {
    if (!this.isLogin) {
      this.AuthService.logout();
      return
    }
   
    // Retrieve the employee ID parameter from the URL
    this.activatedRoute.paramMap.subscribe(params => {
      const uuid = params.get('uuid');  // Convert to number using '+'
    
      if (uuid) {
        this.employee = this.employeeService.getEmployeeById(uuid);
        if (this.employee) {
          // Format employee data if needed

        }
      }else{
        this.router.navigate(["list"])
      }
    });
  }

  formatBasicSalary(basicSalary: number): string {
    // Implement your formatting logic here, for example: Rp. xx.xxx,xx
    return `Rp. ${basicSalary.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  }

  navigateBack(): void {
    this.router.navigate(['/list']);
  }
}
