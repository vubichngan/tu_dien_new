import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ClientService } from 'src/app/service/client.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private clientService: ClientService, private router: Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler){

        if(req.headers.get('noauth'))
            return next.handle(req.clone());
        else{
            const clonedrep=req.clone({
                headers: req.headers.set("Authorization", "Bearer "+this.clientService.getToken())
            });
            return next.handle(clonedrep).pipe(
                tap(
                    event=>{},
                    err=>{
                        if(err.error.auth==false){
                            this.router.navigateByUrl('/login');
                        }
                    }
                )
            )
        }
    }
}