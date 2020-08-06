import { IApiService } from './IApiService';

export interface IModelService<T> {

    get(): T[];
    search(filter:{[fieldName:string]: Number | string}, api: IApiService<T> ): Promise<T[]>;
    add(element:T, api: IApiService<T>):Promise<T>;
    update(elements:T[], api: IApiService<T>):boolean;
    delete(elements:T[], api: IApiService<T>):boolean;
    
}