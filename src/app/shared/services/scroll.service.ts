import { Injectable } from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {fromEvent} from 'rxjs/observable/fromEvent';
import {merge} from 'rxjs/observable/merge';
import {tap,map,pairwise,
	share,distinctUntilChanged,
  filter,startWith,throttleTime,delay,mergeMap} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Router} from '@angular/router';
enum Direction {
	Up='Up',
	Down='Down'
}


@Injectable()
export class ScrollService {
scrollOffset$:Observable<any>;
scrollReachedTop$;
scroll$;
scrollUp$;
scrollDown$;
routeChange$;
  constructor(private router:Router) { 
  	this.routeChange$ = this.router.events.pipe(map(()=>window.pageYOffset));
  	let scrollOffset$ = fromEvent(window,'scroll').pipe(


  		map(()=>window.pageYOffset)
  		)
  	this.scrollOffset$ = merge(scrollOffset$,this.routeChange$);
  	this.scroll$ = this.scrollOffset$.pipe(

      throttleTime(40),
  		pairwise(),
      //filter(([y1,y2])=>y1!==y2),
  		map(([y1,y2]):Direction=>((y2<y1 || y2<20) ? Direction.Up : Direction.Down)),
  		distinctUntilChanged(),
  		share()
  		)

  	this.scrollReachedTop$ = this.scrollOffset$.pipe(	
  		pairwise(),

  		map(([y1,y2])=>{
  		if(y1 > 20){
  			return false;
  		}else{
        return true;
      }
  		}),
  		distinctUntilChanged()
  	);

  	this.scrollUp$ = this.scroll$.pipe(filter((direction)=>direction === Direction.Up));
  	this.scrollDown$ = this.scroll$.pipe(filter((direction)=>direction === Direction.Down));
  }
  
}
