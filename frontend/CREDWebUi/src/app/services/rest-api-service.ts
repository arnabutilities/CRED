import { IApiService } from "./IApiService";
import { Product } from "../models/Product";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { JwtExceptions } from "../exceptions/JwtExceptions";
import { RestException } from "../exceptions/RestException";
import { environment } from '../../environments/environment';
import { API_END_POINTS } from '../config/rest-endpoint.config';
import { Observable } from "rxjs";

var jwt;

export enum REST_API_PROPERTIES {
    HEADERS = 'headers',
    PAYLOAD = 'payload',
    URL = 'url',
    METHOD = 'method'
}

export class RESTApiServiceForProduct implements IApiService<Product>{

    private apiOptions: Map<REST_API_PROPERTIES, any> = new Map<REST_API_PROPERTIES, any>();

    setProperties(key: REST_API_PROPERTIES, value: any): void {
        this.apiOptions.set(key, value);
    }

    private prepareProperties(): Observable<Product> {
        if (!this.apiOptions) throw new Error('ApiOptions is not set!!');

        let headers = this.apiOptions.get(REST_API_PROPERTIES.HEADERS);
        let httpHeaders: HttpHeaders;
        if (headers) {
            httpHeaders = new HttpHeaders(headers)
        }
        if (this.apiOptions.get(REST_API_PROPERTIES.METHOD) == 'GET') {
            return <Observable<Product>> this.httpClient.get(this.apiOptions.get(REST_API_PROPERTIES.URL), { headers: httpHeaders });
        }
        if (this.apiOptions.get(REST_API_PROPERTIES.METHOD) == 'POST') {
            return <Observable<Product>> this.httpClient.post(
                this.apiOptions.get(REST_API_PROPERTIES.URL),
                this.apiOptions.get(REST_API_PROPERTIES.PAYLOAD),
                { headers: httpHeaders }
            );
        }
    }
    getData(): Promise<Product> {
        this.apiOptions.set(REST_API_PROPERTIES.METHOD, 'GET');
        return this.prepareProperties().toPromise();
    }
    postData(): Promise<Product> {
        this.apiOptions.set(REST_API_PROPERTIES.METHOD, 'POST');
        return this.prepareProperties().toPromise();
    }
    
    filterData(): Promise<Product[]> {
        if (!this.apiOptions) throw new Error('ApiOptions is not set!!');

        let headers = this.apiOptions.get(REST_API_PROPERTIES.HEADERS);
        let httpHeaders: HttpHeaders;
        if (headers) {
            httpHeaders = new HttpHeaders(headers)
        }
        return <Promise<Product[]>> this.httpClient.post(
            this.apiOptions.get(REST_API_PROPERTIES.URL),
            this.apiOptions.get(REST_API_PROPERTIES.PAYLOAD),
            { headers: httpHeaders }
        ).toPromise();
    }

    async getJwt(): Promise<string> {
        try {
            let response:{ [body:string]: any}  = await this.httpClient.get(API_END_POINTS.BASE_PATH + API_END_POINTS.JWT).toPromise();
            return new Promise<string>((resolve, reject) => {
                if((response?.body)?.jwt) {
                    resolve(response.body.jwt)
                } else {
                    reject( new JwtExceptions(new Error('jwt invalid token')))
                }
            });
        } catch (e) {
            throw new JwtExceptions(new Error('jwt api failed'));
        }
    }

    async initJWt() {
        try {
            if (jwt) {
                return jwt;
            } else {
                jwt = await this.getJwt();
            }
        } catch (e) {
            new RestException(e);
        }

    }

    constructor(private httpClient: HttpClient, actionPath = API_END_POINTS.NODATA) {
        this.apiOptions.set(REST_API_PROPERTIES.HEADERS, [{ 'content-type': 'application/json' }, { 'Authentication': 'Bearer ' + jwt }]);
        this.apiOptions.set(REST_API_PROPERTIES.PAYLOAD, []);
        this.apiOptions.set(REST_API_PROPERTIES.URL, API_END_POINTS.BASE_PATH + actionPath);
    }

}