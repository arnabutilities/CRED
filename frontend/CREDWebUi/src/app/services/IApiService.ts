export interface IApiService<T> {

    setProperties(key: any, value:any):void;
    filterData(filter:{[fieldName:string]:string|number}): Promise<T[]>
    getData():Promise<T>;
    postData(element:T):Promise<T>;
}