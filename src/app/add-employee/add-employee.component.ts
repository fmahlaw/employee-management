import { Component } from '@angular/core';
import { Employee } from '../employee-data/employee.model';
import { EmployeeService } from '../employee-data/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  titlePage: string = "";
  isLogin: Boolean;
  employee: Employee = {
    uuid: "",
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    birthDate: new Date(),
    basicSalary: 0,
    status: '',
    group: '',
    description: new Date()
  };

  groups: string[] = ['Group1', 'Group2', 'Group3', 'Group4', 'Group5', 'Group6', 'Group7', 'Group8', 'Group9', 'Group10'];

  constructor(
    private employeeService: EmployeeService,
    private router: Router, private activatedRoute: ActivatedRoute, private AuthService: AuthService
  ) {
    this.isLogin = AuthService.getLoginStatus()

  }

  ngOnInit(): void {

    if (!this.isLogin) {
      this.AuthService.logout();
      return
    }
    // Retrieve the uuid parameter from the URL
    this.activatedRoute.paramMap.subscribe(params => {
      const uuid = params.get('uuid');  // Convert to number using '+'
      if (uuid) {
        this.titlePage = "Edit Employee"
        const existingEmployee = this.employeeService.getEmployeeById(uuid);
        if (existingEmployee !== null && existingEmployee !== undefined) {
          this.employee = { ...existingEmployee };
        }
      } else {
        this.titlePage = "Add Employee"
      }
    });
  }



  saveEmployee(): void {
    if (this.validateEmployee()) {
      // Check if the employee already exists (using UUID)
      if (this.employeeService.employeeExists(this.employee.uuid)) {
        // Edit the employee by removing and adding the updated one
        this.employeeService.removeEmployee(this.employee.uuid);
        this.employeeService.addEmployee(this.employee);
      } else {
        this.employeeService.addEmployee(this.employee);
      }

      // Clear the form after saving or editing
      this.clearFields();

      // Navigate to the employee list
      this.router.navigate(['/list']);
    }
  }


  validateEmployee(): boolean {
    // Check if any required fields are empty
    if (!this.employee.username || !this.employee.firstName || !this.employee.lastName ||
      !this.employee.email || !this.employee.basicSalary) {
      alert('Please fill in all required fields.');
      return false;
    }

    // Check if the email contains '@'
    if (!this.employee.email.includes('@')) {
      alert('Please enter a valid email address.');
      return false;
    }

    // Validation passed
    return true;
  }


  clearFields(): void {
    // Clear all form fields
    this.employee = {
      uuid: "",
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      birthDate: new Date(),
      basicSalary: 0,
      status: '',
      group: '',
      description: new Date()
    };
  }

  cancel(): void {
    this.router.navigate(['/list']);
  }
}
