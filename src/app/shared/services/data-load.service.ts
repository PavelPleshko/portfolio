import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class DataLoadService {
contentLoaded:BehaviorSubject<boolean>= new BehaviorSubject<boolean>(true);
  constructor() {
  
   }


startLoadingContent(){
	this.contentLoaded.next(false);
}
stopLoadingContent(){
	this.contentLoaded.next(true);
}
}
