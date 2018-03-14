import { Component, OnChanges,Input } from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnChanges {
@Input() statuses:any;
currentStatus;

	


  constructor() { }

  ngOnChanges() {
  	console.log(this.statuses);

	if(this.statuses){
		this.currentStatus = this.statuses.find((status)=>status.active==true);
	}
  }
randomFromMessages(){
	let len = this.currentStatus.messages.length;
	return Math.round(Math.random()*len);
}
}
