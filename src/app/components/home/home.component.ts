import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, Location } from '@angular/common';
import { ApploadDataService } from '../../services/appload-data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BreakpointObserver, Breakpoints, BreakpointState, MediaMatcher } from '@angular/cdk/layout';
import {Title, Meta} from "@angular/platform-browser";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public catagoriesOnLoad: any[] = [];
  public catagories: any[] = [];
  public distributorLeads: any[] = [];
  sizeMessage: any[] = [];
  public allDistributorsLeads:any[]=[];
  viewportSizes = [
    Breakpoints.XSmall,
    Breakpoints.Small,
    Breakpoints.Medium,
    Breakpoints.Large,
    Breakpoints.XLarge
  ];
  constructor(
    private location: Location,
    private apploadDataService: ApploadDataService,  private titleService:Title,
    private meta:Meta,
    private SpinnerService: NgxSpinnerService, public breakpointObserver: BreakpointObserver, public mediaMatcher: MediaMatcher,@Inject(PLATFORM_ID) private plateformId:object) {
    this.router = location.path();
    this.viewportSizes.forEach((s) => {
      this.sizeMessage.push(
        mediaMatcher.matchMedia(s)
      );
    });
  }

  router: string;
  ngOnInit(): void {
    // this.SpinnerService.show();
    this.titleService.setTitle("Appoint Distributors");
    this.apploadDataService.getApplicationLoadData().subscribe(result => {
      // console.log(result);
      result.categories.forEach(element => {
        this.catagories.push(element);
      });
      result.distributorLeads.forEach(element => {
        element.forEach(ele => {
          this.allDistributorsLeads.push(ele);
        });
      });
      this.breakpointObserver.observe([Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge])
        .subscribe((state: BreakpointState) => {
          if (state.breakpoints['(max-width: 599.98px)'] == true) {
            this.distributorLeads = this.chunk(result.distributorLeads.flat(), 1);
          } else if (state.breakpoints['(min-width: 600px) and (max-width: 959.98px)'] == true) {
            this.distributorLeads = this.chunk(result.distributorLeads.flat(), 2);

          } else {
            result.distributorLeads.forEach(element => {
              this.distributorLeads.push(element);
            });
          }
        });

      for (const catagory of result.categories[0]) {
        this.catagoriesOnLoad.push(catagory);
      }
      for (const catagory of result.categories[1].slice(0, 3)) {
        this.catagoriesOnLoad.push(catagory);
      }
      if(isPlatformBrowser(this.plateformId)){
      sessionStorage.setItem('catagories', JSON.stringify(this.catagories));
      }

      this.SpinnerService.hide();
    });
  }

  chunk(arr, size) {
    const result = arr.reduce((rows, key, index) => (index % size == 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows, []);
    return result;
  }

}
