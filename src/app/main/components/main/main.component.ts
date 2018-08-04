import { Component, OnInit,OnDestroy } from '@angular/core';
import {ContentService} from '../../../shared/services/content.service';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {DataLoadService} from '../../../shared/services/data-load.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit,OnDestroy{
skills;
abouts;
statuses;
services;
resumeLink:string;
subscriptions = [];
animationState:string;

  constructor(private contentService:ContentService,private dataLoadService:DataLoadService) { }

  ngOnInit() {
  this.animationState = 'inactive';
this.dataLoadService.startLoadingContent();
  	let mainSub = forkJoin(this.contentService.getSkillsets(),
  	this.contentService.getAboutInfo(),this.contentService.getStatus(),this.contentService.getResume(),
    this.contentService.getServices())
  	.subscribe(data=>{
  			
  		
  		this.skills = data[0];
  		this.abouts = data[1];
  		this.statuses = data[2];
      this.resumeLink = data[3][0].resume.fields.file.url;
      this.services = data[4];
  		this.dataLoadService.stopLoadingContent();
		this.animationState = 'active';
  	});
  	this.subscriptions.push(mainSub);
  }

onContentLoaded(){

		
	
}



ngOnDestroy(){
	this.subscriptions.forEach((sub)=>sub.unsubscribe());
}
}
