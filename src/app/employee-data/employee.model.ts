export interface Employee {
    uuid:string,
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    birthDate: Date;
    basicSalary: number;
    status: string;
    group: string;
    description: Date;
    [key: string]: any; 
  }
  