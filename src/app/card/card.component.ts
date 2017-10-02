import { Component, OnInit, Input, OnDestroy, trigger,
  state,
  style,
  transition,
  animate } from '@angular/core';

import {SpinnerService} from "../services/spinner.service"


@Component({
  selector: 'card-view',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
    host: {
    'class': 'nh-cardview'
  },
  animations: [
  trigger('flyInOut', [
    state('in', style({transform: 'translateX(0)'})),
    state('out', style({transform: 'translateX(0)'})),
    transition('void => in', [
      style({transform: 'translateX(-100%)'}),
      animate(100)
    ]),
    transition('void => out', [
      style({transform: 'translateX(100%)'}),
      animate(100)
    ])
  ])
]
})
export class CardComponent implements OnInit {
  showInfo: boolean = false;
  private _post;
  flyInOutState:string = "out";
  constructor() { }
  /* Component life cycle events */
  ngOnInit() {
    //this.flyInOutState = "in";
  }

  /*Inputs here*/    
  @Input()
  set post(post: any) {
    this._post = post;
  }
  get post(): any { return this._post; }

  @Input()
  set flytype(state: string){
    this.flyInOutState = state;
  }
  get flytype(): string {return this.flyInOutState; }


  /* Here user functions */
  infoClicked(e){
    this.showInfo = true;
  }

  closeClicked(e){
    this.showInfo = false;
  }
}
