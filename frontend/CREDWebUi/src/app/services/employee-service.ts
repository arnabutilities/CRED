import { Employee } from "../models/Employee";
import { IModelService } from "./IModelService";
import { IApiService } from './IApiService';
import { REST_API_PROPERTIES } from './rest-api-service';

export class EmployeeService implements IModelService<Employee> {

    search(filter:{[fieldName:string]:string|number}, api: IApiService<Employee> ):  Promise<Employee[]> {
        api.setProperties(REST_API_PROPERTIES.PAYLOAD, filter);
        return api.filterData(filter);
    }
    add(element: Employee, api: IApiService<Employee>): Promise<Employee> {
        api.setProperties(REST_API_PROPERTIES.PAYLOAD, element);
        return api.postData(element);
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