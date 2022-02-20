import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { AuthService } from "./auth.service";

@Injectable()
export class CanActivateGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // if ('IsEmpty'==='IsEmpty') {
    //   this.router.navigate(["/login"]);
    //   return false;
    // }
    const id = +route.paramMap.get('id')
    return this.auth.apiCall(id).pipe(
      tap(allowed => {
        console.log(allowed);
      })
    );
  }
}
