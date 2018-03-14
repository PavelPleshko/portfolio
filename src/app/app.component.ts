import { Component,OnInit} from '@angular/core';
import {ContentService} from './shared/services/content.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
socials=[];
slides=[
{src:'/assets/img/status.png',caption:{
	header:'Slider 0',
	subheader:'Subheading 0',
	callToActionBtn:{
		text:'Shop',
		link:'/shop'
}}},
{src:'/assets/img/status_pad.png',caption:{
	header:'Slider 1',
	subheader:'Subheading 1',
	callToActionBtn:{
		text:'Shop',
		link:'/shop'
}
}},
{src:'/assets/img/status_mob.png',caption:{
	header:'Slider 2',
	subheader:'Subheading 2',
	callToActionBtn:{
		text:'Shop',
		link:'/shop'
}
}}];
config={
	delay:4000,
	animationName:'fadeIn'
}
 constructor(private contentService:ContentService){

 	
 }

ngOnInit(){
	this.contentService.getSocials().subscribe(socials=>{
		this.socials = socials;
	})
}
}
