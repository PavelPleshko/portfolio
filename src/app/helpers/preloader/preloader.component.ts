import { Component, OnInit } from '@angular/core';
import {DataLoadService} from '../../shared/services/data-load.service';
@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss']
})
export class PreloaderComponent{
contentLoaded: boolean;
  constructor(public dataLoadService: DataLoadService) {
  this.dataLoadService.contentLoaded.subscribe((loaded) => {
 		this.contentLoaded = loaded;
 	});
 	 }

}
