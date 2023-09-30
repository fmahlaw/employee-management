import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee-data/employee.service';
import { Employee } from '../employee-data/employee.model';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {
  isLogin: boolean;
  employees: Employee[] = [];
  itemsPerPageOptions: number[] = [10, 20, 50]; // Options for items per page
  selectedItemsPerPage: number = this.itemsPerPageOptions[0]; // Default items per page
  currentPage = 1;
  sortBy: string | null = null;
  sortDirection: number = 1;
  searchUsername: string = '';
  searchFirstName: string = '';
  notification: { type: string, message: string } | null = null;

  constructor(private employeeService: EmployeeService, private router: Router, private AuthService: AuthService) {
    this.isLogin = this.AuthService.getLoginStatus();
  }


  ngOnInit(): void {
    if (!this.isLogin) {
      this.AuthService.logout();
      return
    }

    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
    });
  }


  // Function to handle sorting
  sort(property: string): void {
    if (this.sortBy === property) {
      this.sortDirection = -this.sortDirection; // Change the direction if same property clicked again
    } else {
      this.sortBy = property;
      this.sortDirection = 1;
    }
    this.employees = this.employees.sort((a, b) => {
      const aValue = a[property];
      const bValue = b[property];
      return this.sortDirection * aValue.localeCompare(bValue);
    });
  }

  filterEmployees(): Employee[] {
    const startIdx = (this.currentPage - 1) * this.selectedItemsPerPage;
    const endIdx = this.currentPage * this.selectedItemsPerPage;
    return this.employees
      .filter(employee => {
        const usernameMatch = employee.username.toLowerCase().includes(this.searchUsername.toLowerCase());
        const firstNameMatch = employee.firstName.toLowerCase().includes(this.searchFirstName.toLowerCase());
        return usernameMatch && firstNameMatch;
      })
      .slice(startIdx, endIdx);
  }

  editEmployee(employee: Employee): void {

    this.router.navigate(['/edit', employee.uuid]);
  }

  profileEmployee(employee: Employee): void {

    this.router.navigate(['/profile', employee.uuid]);
  }
  // editEmployee(employee: Employee): void {
  //   // Add logic to handle editing (e.g., navigate to the edit page)
  //   this.notification = { type: 'edit', message: 'Editing employee: ' + employee.username };
  // }

  deleteEmployee(employee: Employee): void {
    this.employeeService.deleteEmployee(employee['uuid']);
    this.notification = { type: 'delete', message: 'Deleted employee: ' + employee.username };
  }
}



