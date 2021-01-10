import { Employee } from "../models/Employee";
import { IModelService } from "./IModelService";
import { IApiService } from './IApiService';
import { REST_API_PROPERTIES } from './rest-api-service';
import { Subject } from 'rxjs';

export enum EMPLOYEE_SERVICE_STATUS {
    NEW_USER_ADD_SUCCESS="new_user_add_success"
}

export class EmployeeService implements IModelService<Employee> {

    private listChange:Subject<EMPLOYEE_SERVICE_STATUS> = new Subject<EMPLOYEE_SERVICE_STATUS>();

    search(filter:{[fieldName:string]:string|number}, api: IApiService<Employee> ):  Promise<Employee[]> {
        api.setProperties(REST_API_PROPERTIES.PAYLOAD, filter);
        return api.filterData(filter);
    }
    add(element: Employee, api: IApiService<Employee>): Promise<Employee> {
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
    update(elements: Employee[]): boolean {
        throw new Error("Method not implemented.");
    }
    delete(elements: Employee[]): boolean {
        throw new Error("Method not implemented.");
    }

    get(): Employee[] {
        return [];
    }
    private formatPayload (e:Employee):any {

    }
}