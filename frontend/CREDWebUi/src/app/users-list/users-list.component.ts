import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { IApiService } from '../services/IApiService';
import { Employee } from '../models/Employee';
import { RESTApiServiceForEmployee, REST_API_PROPERTIES } from '../services/rest-api-service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { API_END_POINTS } from '../config/rest-endpoint.config';
import { EmployeeService, EMPLOYEE_SERVICE_STATUS } from '../services/employee-service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: Employee[] = [];


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'dob', 'department', 'gender'];
  dataSource:MatTableDataSource<Employee> = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.listUser();
    this.emp.listen(EMPLOYEE_SERVICE_STATUS.NEW_USER_ADD_SUCCESS, () => this.listUser());
  }
  constructor(private http:HttpClient, private emp:EmployeeService){

  }

  async listUser() {
    try {
      let e:IApiService<Employee> = new RESTApiServiceForEmployee (this.http, API_END_POINTS.LIST_EMPLOYEE );

      let httpClientResponse = await this.emp.search( null , e);
      if(httpClientResponse) {
        this.dataSource.data =  httpClientResponse;
      }

    } catch (e){
      console.log(<HttpErrorResponse> e.message);
    }
  }

}
