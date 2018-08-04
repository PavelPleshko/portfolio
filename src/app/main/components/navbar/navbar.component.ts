import { Component, AfterViewInit,OnInit,Input,
	ChangeDetectionStrategy,Renderer2,OnDestroy,ViewChild,ElementRef,
  ChangeDetectorRef,HostBinding } from '@angular/core';
import {fromEvent} from 'rxjs/observable/fromEvent';
import {Observable} from 'rxjs/Observable';

import {ScrollService} from '../../../shared/services/scroll.service';
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
scrollReachedTop$:Observable<boolean>;
showNav$:Observable<boolean>;
subscriptions:Array<any>=[];

  constructor(private renderer:Renderer2,private cdr:ChangeDetectorRef,
    private scrollService:ScrollService) {

     }

   ngOnInit(){
     this.scrollReachedTop$ = this.scrollService.scrollReachedTop$;
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
