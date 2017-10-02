import { Component } from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';


@Component({
  selector: 'qrcode-dialog',
  template: `<h2 md-dialog-title>Scan this QR code</h2>
  <p><img [src]="currentUrl" width="150px" height="150px" alt="QR code"/></p>`
})
export class QrcodeComponent {
  currentUrl:string = "";
  constructor(public dialogRef: MdDialogRef<QrcodeComponent>, location:Location) { 
    this.currentUrl = "https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=http://dev3.shareourideas.com/words/%23"+encodeURIComponent(location.path()) + "&choe=UTF-8";
    //console.debug(this.currentUrl);
  }
}



