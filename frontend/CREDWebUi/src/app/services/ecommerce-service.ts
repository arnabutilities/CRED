import { Product } from "../models/Product";
import { IModelService } from "./IModelService";
import { IApiService } from './IApiService';
import { REST_API_PROPERTIES } from './rest-api-service';
import { Subject } from 'rxjs';

export enum EMPLOYEE_SERVICE_STATUS {
    NEW_USER_ADD_SUCCESS="new_user_add_success"
}

export class EcommerceService implements IModelService<Product> {

    private listChange:Subject<EMPLOYEE_SERVICE_STATUS> = new Subject<EMPLOYEE_SERVICE_STATUS>();

    search(filter:{[fieldName:string]:string|number}, api: IApiService<Product> ):  Promise<Product[]> {
        api.setProperties(REST_API_PROPERTIES.PAYLOAD, filter);
        return api.filterData(filter);
    }
    add(element: Product, api: IApiService<Product>): Promise<Product> {
        api.setProperties(REST_API_PROPERTIES.PAYLOAD, element);
        return api.postData(element);
    }
    notify(n:EMPLOYEE_SERVICE_STATUS){
        if(n === EMPLOYEE_SERVICE_STATUS.NEW_USER_ADD_SUCCESS){
            this.listChange.next(EMPLOYEE_SERVICE_STATUS.NEW_USER_ADD_SUCCESS);
        }
    }
    listen(providedState:EMPLOYEE_SERVICE_STATUS, cb:Function){
        this.listChange.subscribe((state:EMPLOYEE_SERVICE_STATUS) => {
            if(providedState === state){
                cb();
            }
        })
    }
    update(elements: Product[]): boolean {
        throw new Error("Method not implemented.");
    }
    delete(elements: Product[]): boolean {
        throw new Error("Method not implemented.");
    }

    get(): Product[] {
        return [];
    }
    private formatPayload (e:Product):any {

    }
}