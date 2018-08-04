import { Component, OnInit,Input,ChangeDetectionStrategy,ChangeDetectorRef,Renderer,ViewChild,ElementRef,HostBinding } from '@angular/core';
import {ContentService} from '../../../shared/services/content.service';
import {Observable} from 'rxjs/Observable';
import {fromEvent} from 'rxjs/observable/fromEvent';
import {defer} from 'rxjs/observable/defer';
import {switchMap,takeUntil,map,tap} from 'rxjs/operators';
import {slideInOutAnimation} from '../../../animations/animations';
@Component({
  selector: 'app-project-gallery',
  templateUrl: './project-gallery.component.html',
  styleUrls: ['./project-gallery.component.scss'],
  host:{
  	'(click)':'closeGallery()'
  },
  animations:[slideInOutAnimation],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProjectGalleryComponent implements OnInit {
@Input() currentProject:any = null;
@ViewChild('gallery') gallery:ElementRef;
currentActiveImage:number=0;
touchStart;
touchMove;
touchEnd;
listenersActive:boolean = false;
percentage;
cachedPercentage;
dotsArray;

  constructor(private contentService:ContentService,private cdr:ChangeDetectorRef,private renderer:Renderer) { }

  ngOnInit() {
  	if(this.currentProject){
  			this.startListeners();
  			this.dotsArray = new Array(this.currentProject.extraImages.length).fill(false);
  			this.updateDots();
  		}
  }


  closeGallery(){
  	this.contentService.closeCurrentGallery();
  	this.currentActiveImage=0;
  	this.touchStart.unsubscribe();
  	this.listenersActive=false;
  }

  startListeners(){
  	if(!this.listenersActive){
  		this.listenersActive = true;
  		let pos=0;
  		let end = fromEvent(document,'touchend').pipe(tap(val=>{
  			if(Math.abs(pos)>=window.innerWidth/3){
  				if(pos>0){
  				this.changeActivePicture(1);
  			}else{
  				this.changeActivePicture(-1);
  			}
  			}else{
  				this.stepBack();
  			}
  			let element = this.gallery.nativeElement.querySelector(`#image-${this.currentActiveImage}`);
  			this.renderer.setElementStyle(element,'margin','');
  			
  		}));
  		let move = fromEvent(this.gallery.nativeElement,'touchmove');
  		this.touchStart= fromEvent(this.gallery.nativeElement,'touchstart').pipe(switchMap((start:any)=>{
  			let element = this.gallery.nativeElement.querySelector(`#image-${this.currentActiveImage}`);
  			this.renderer.setElementStyle(element,'margin','0 2em');
  			return move.pipe(map((move:any)=>{
  				return (move.touches[0].pageX-start.touches[0].pageX)
  			}))
  		}),switchMap(position=>{
  			pos=position;
  			this.percentage = pos/window.innerWidth * 100 - (this.cachedPercentage || 0);		
  			this.renderer.setElementStyle(this.gallery.nativeElement,'transform',`translate3d(${this.percentage}%,-50%,0)`);
  				return end;	
  		})).subscribe();
  	}
  }

  changeActivePicture(direction){
this.currentActiveImage-=direction;

this.currentActiveImage = this.currentActiveImage<0?0:this.currentActiveImage;
this.currentActiveImage = this.currentActiveImage>this.currentProject.extraImages.length-1?this.currentProject.extraImages.length-1:this.currentActiveImage;
let percentage = 100 * this.currentActiveImage;
this.updateDots();
this.cachedPercentage =percentage;
	this.renderer.setElementStyle(this.gallery.nativeElement,'transform',`translate3d(-${percentage}%,-50%,0)`);
this.cdr.detectChanges();
  }

  stepBack(){
  	this.percentage = this.currentActiveImage*100;
  	this.cachedPercentage=this.percentage;
  	this.renderer.setElementStyle(this.gallery.nativeElement,'transform',`translate3d(-${this.percentage}%,-50%,0)`);
  	this.cdr.detectChanges();
  }

  updateDots(){
  	this.dotsArray = this.dotsArray.map((element,idx)=>{
	if(idx==this.currentActiveImage){
		return true;
	}
	return false;
});
  }
}
