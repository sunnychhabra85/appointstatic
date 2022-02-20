import { Component, EventEmitter, Inject, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { BusinessProfile } from 'src/app/models/businessProfile.model';
import { RequestType } from 'src/app/models/system.enums';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-my-business-profile',
  templateUrl: './my-business-profile.component.html',
  styleUrls: ['./my-business-profile.component.css']
})
export class MyBusinessProfileComponent implements OnInit {

  @Output() closePopupEvent = new EventEmitter<any>();

  public businessProfile: BusinessProfile = new BusinessProfile();

  constructor(private _loginService: LoginService, @Inject(PLATFORM_ID) private plateformId:object) { }

  ngOnInit(): void {
    if(isPlatformBrowser(this.plateformId)){
    var user = JSON.parse(sessionStorage.getItem('user'));
    this._loginService.getUserBusinessProfile(user.id).subscribe((data: BusinessProfile) => {
      this.businessProfile = data;
    });
  }
  }

  cancelRequest(): void {
    this.closePop();
  }

  closePop(): any {
    return this.closePopupEvent.emit(null);
  }

}
