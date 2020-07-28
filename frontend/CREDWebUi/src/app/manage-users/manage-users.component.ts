import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RESTApiServiceForEmployee, REST_API_PROPERTIES } from '../services/rest-api-service';
import { EmployeeService} from '../services/employee-service';
import { Employee } from '../models/Employee';
import { IApiService } from '../services/IApiService';
import { API_END_POINTS } from '../config/rest-endpoint.config';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  employees: FormGroup;

  firstNameControl = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(56)
  ]);
  lastNameControl = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(56)
  ]);
  genderControl = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(56)
  ]);
  dobControl = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(56)
  ]);
  deptControl = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(56)
  ]);

  depts:Map<string, string> = new Map <string, string>(); 
  genders:Map<string, string> = new Map <string, string>(); 


  constructor(fb: FormBuilder, private http:HttpClient) {

    this.depts.set('dep1', 'DEPT 1')
              .set('dep2', 'DEPT 2')
              .set('dep3', 'DEPT 2');

    this.genders.set('female', 'Female')
             .set('male', 'Male')
             .set('other', 'Other');

    this.employees = fb.group({
      firstName: this.firstNameControl,
      lastName: this.lastNameControl,
      gender: this.genderControl,
      dob: this.dobControl,
      dept: this.deptControl,
    });

  }

  ngOnInit(): void {
  }

  async createUser() {
    try {
      let e:IApiService<Employee> = new RESTApiServiceForEmployee (this.http, API_END_POINTS.ADD_EMPLOYEE );

      let emp = new EmployeeService();
      let httpClientResponse = await emp.add(this.createEmployeeFromForm(this.employees), e);

    } catch (e){
      console.log(<HttpErrorResponse> e.message);
    }
  }

  createEmployeeFromForm(f: FormGroup):Employee{
    let e:Employee = new Employee();
    e.firstName = f.value.firstName;
    e.lastName=  f.value.lastName;
    e.dob=  f.value.dob;
    e.gender=  f.value.gender;
    e.department=  f.value.dept;
    return e;
  }

}
