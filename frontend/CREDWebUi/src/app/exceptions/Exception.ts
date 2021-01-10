import { isDevMode } from "@angular/core";
import {environment} from '../../environments/environment';
export class Exception extends Error {
    constructor(error, exceptionType:string) {
        super(error.message);
        if(environment.debug){
            console.log('['+exceptionType+']',error.message);
        }
        throw new Error(error.message);
    }
}