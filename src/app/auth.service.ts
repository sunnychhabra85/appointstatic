import { Injectable } from "@angular/core";
import { Component, OnInit, Input,  Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { of, Observable } from "rxjs";
import { tap, map } from "rxjs/operators";
import { MasterDataService } from 'src/app/services/master-data.service';
import {Title, Meta} from "@angular/platform-browser";
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Injectable()
export class AuthService {
    urlTree:any;
    params:any;
  constructor(private http: HttpClient, private router: Router, private _activatedRoute: ActivatedRoute, private _masterDataService: MasterDataService, private titleService:Title, private meta:Meta) {}
  apiCall(id): Observable<boolean> {
    return this._masterDataService.getCategoryByID(id).pipe(
      tap(res =>{
        this.titleService.setTitle(res.title);
        this.meta.updateTag({name: 'keywords', content: res.meta_Keywords});
        this.meta.updateTag({name: 'description', content: res.meta_Description});

        this.urlTree = this.router.createUrlTree(["/searchresultcategory/"+res.url],{
            relativeTo: this._activatedRoute,
            queryParams: this.params,
            queryParamsHandling: 'preserve'
          });
      
      //Update the URL       
      // this.location.go(this.urlTree.toString());
    //   this.router.navigateByUrl(this.urlTree, {
    //     replaceUrl: true
    //   });
      }         
        ),
      map(res => true, error => false)
    );
  }
}
