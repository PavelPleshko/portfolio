import { Component, OnChanges, Input, OnDestroy } from '@angular/core';
import * as Blazy from 'blazy';
@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
  host: {
    '(window:resize)': 'onResize()'
  }
})
export class StatusComponent implements OnChanges, OnDestroy {
@Input() statuses: any;
currentStatus;
blazy;




  constructor() {
  this.blazy = new Blazy({
      selector: '.b-lazy',
      src: 'data-blazy'
    }); }

  ngOnChanges() {
	if (this.statuses){
		this.currentStatus = this.statuses.find((status) => status.active == true);
	}
  }
  onResize(){
    this.blazy.revalidate();
  }
randomFromMessages(){
	const len = this.currentStatus.messages.length;
	return Math.round(Math.random() * len);
}
ngOnDestroy(){
  this.blazy.destroy();
}
}
