import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees: Employee[] = []; // Dummy employee data

  private employeesSubject: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>(this.employees);


  constructor() {
    // Generate 100 dummy employee data (for demonstration purposes)
    for (let i = 1; i <= 100; i++) {
      const employee: Employee = {
        uuid:`user${i}`,
        username: `user${i}`,
        firstName: `First${i}`,
        lastName: `Last${i}`,
        email: `user${i}@example.com`,
        birthDate: new Date(1980 + i, 0, 1), // Dummy birth date
        basicSalary: 50000 + Math.random() * 50000, // Dummy basic salary
        status: i % 2 === 0 ? 'Active' : 'Inactive', // Alternate status
        group: `Group ${Math.floor(Math.random() * 10) + 1}`,
        description: new Date(2023, 0, 1)
      };
      this.employees.push(employee);
    }
  }

  getEmployees(): Observable<Employee[]> {
    return this.employeesSubject.asObservable();
  }

  addEmployee(employee: Employee): void {
    console.log(employee)
    this.employees.unshift(employee);
    this.employeesSubject.next(this.employees);
  }

  editEmployee(updatedEmployee: Employee): void {
    const index = this.employees.findIndex(emp => emp['uuid'] === updatedEmployee['uuid']);
    if (index !== -1) {
      this.employees[index] = updatedEmployee;
      this.employeesSubject.next(this.employees);
    }
  }
   deleteEmployee(uuid: string): void {
    this.employees = this.employees.filter(employee => employee['uuid'] !== uuid);
    this.employeesSubject.next(this.employees);
  }

  employeeExists(uuid: string): boolean {
    return this.employees.some(emp => emp['uuid'] === uuid);
  }

  getEmployeeById(uuid: string): Employee | undefined {
    return this.employees.find(emp => emp['uuid'] === uuid);
  }

  removeEmployee(uuid: string): void {
    // Find the index of the employee with the given uuid
    const index = this.employees.findIndex(emp => emp['uuid'] === uuid);
    if (index !== -1) {
      // Remove the employee at the found index
      this.employees.splice(index, 1);
      this.employeesSubject.next(this.employees);
    }
  }

  // Implement sorting, searching, and other functionality as needed
}
