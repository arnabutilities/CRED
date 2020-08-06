import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EcommerceService, EMPLOYEE_SERVICE_STATUS} from '../services/ecommerce-service';


@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent implements OnInit {


  constructor(private http:HttpClient, private emp:EcommerceService) {

  

  }

  ngOnInit(): void {
  }

}
