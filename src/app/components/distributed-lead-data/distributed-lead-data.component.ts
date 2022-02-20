import { isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-distributed-lead-data',
  templateUrl: './distributed-lead-data.component.html',
  styleUrls: ['./distributed-lead-data.component.css']
})
export class DistributedLeadDataComponent implements OnInit {

  tableData: any;
  @Output() closePopupEvent = new EventEmitter<any>();

  constructor( @Inject(PLATFORM_ID) private plateformId:object) { }

  ngOnInit(): void {
    if(isPlatformBrowser(this.plateformId)){
    if (sessionStorage.getItem('lead')){
      this.tableData = JSON.parse(sessionStorage.getItem('lead'));
    }
  }
  }

  closePop(): any {
    return this.closePopupEvent.emit(null);
  }

  cancelRequest(): void {
    sessionStorage.removeItem('lead');
    this.closePop();
  }

}
