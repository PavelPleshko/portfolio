import { Component, AfterViewInit,OnInit,Input,
	ChangeDetectionStrategy,Renderer2,OnDestroy,ViewChild,ElementRef,
  ChangeDetectorRef,HostBinding } from '@angular/core';
import {fromEvent} from 'rxjs/observable/fromEvent';
import {concat} from 'rxjs/observable/concat';
import {from} from 'rxjs/observable/from';
import {map,combineLatest} from 'rxjs/operators';

import {Observable} from 'rxjs/Observable';

import {ScrollService} from '../../../shared/services/scroll.service';
import {DataLoadService} from '../../../shared/services/data-load.service';
import {navbarAnimation} from '../../../animations/animations';

enum VisibilityState {
  Visible='visible',
  Hidden='hidden'
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
  animations:[navbarAnimation]
})
export class NavbarComponent implements OnInit,AfterViewInit,OnDestroy {
@Input() socials;
@Input() resumeUrl;
@ViewChild('mobile_menu') mobileMenu:ElementRef;
@HostBinding('@toggle')
get toggle():VisibilityState{
    return this.isVisible ? VisibilityState.Visible : VisibilityState.Hidden
}

isVisible:boolean;
menuListener;
scrollReachedTop$:Observable<any>;
showNav$:Observable<boolean>;
subscriptions:Array<any>=[];

  constructor(private renderer:Renderer2,private cdr:ChangeDetectorRef,
    private scrollService:ScrollService,private dataLoadService:DataLoadService) {

     }

   ngOnInit(){
     let dataLoaded = this.dataLoadService.contentLoaded;
     this.scrollReachedTop$ = this.scrollService.scrollReachedTop$.pipe(
       combineLatest(dataLoaded),
     map(([v1,v2])=>{
      return (v1 && v2)
     })  );
     this.scrollService.scrollUp$.subscribe(()=>this.isVisible=true);
     this.scrollService.scrollDown$.subscribe(()=>this.isVisible=false);
   }

  ngAfterViewInit() {
    this.menuListener = fromEvent(this.mobileMenu.nativeElement,'click')
  	
  }

  handleMenuToggle(e){
  		this.renderer.removeClass(this.mobileMenu.nativeElement,'show')
  }


  ngOnDestroy(){
  	}
}
