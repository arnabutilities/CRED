import { IException } from "./IExceptions";
import { Exception } from "./Exception";

export class RestException extends Exception {
    constructor(err){
        super(err, 'RestException'); 
    }
}