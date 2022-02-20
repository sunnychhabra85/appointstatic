import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { isPlatformBrowser, Location } from '@angular/common';
import { Router } from '@angular/router';
import { DialogComponent } from './shared/components/dialog/dialog.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DMS-Web';
  // tslint:disable-next-line: no-trailing-whitespace
  router: string;  

  constructor(public dialog: MatDialog, private location: Location, private _router: Router, @Inject(PLATFORM_ID) private plateformId:object) {
    // this.router = location.path();
    this.router = _router.url;
    console.log("App Module Loaded...");
    if(isPlatformBrowser(this.plateformId)){
      sessionStorage.setItem("App_name","Appoint Distributors");

      setTimeout(()=>{
        // console.log("App Name:", sessionStorage.getItem("App_name"));
      },2000)
    }
    
  }
  ngOnInit(): void {      
   

  }

  openDialog(componentName): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      disableClose: true,
      width: '750px',
      data: componentName,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
  