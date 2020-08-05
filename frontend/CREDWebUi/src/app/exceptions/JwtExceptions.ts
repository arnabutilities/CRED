import { IException } from "./IExceptions";
import { Exception } from "./Exception";

export class JwtExceptions extends Exception {
    constructor(err){
        super(err, 'JWTException'); 
    }
}