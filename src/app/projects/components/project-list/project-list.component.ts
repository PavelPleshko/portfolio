import { Component, OnInit,Input,ChangeDetectionStrategy,ChangeDetectorRef,Renderer,ViewChild,ElementRef } from '@angular/core';
import {ContentService} from '../../../shared/services/content.service';
import {Observable} from 'rxjs/Observable';
import {fromEvent} from 'rxjs/observable/fromEvent';
import {defer} from 'rxjs/observable/defer';
import {switchMap,takeUntil,map,tap} from 'rxjs/operators';


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {
@Input() projects;
currentProject:any=null;


  constructor(private contentService:ContentService,private cdr:ChangeDetectorRef,private renderer:Renderer) { }

  ngOnInit() {
  	this.contentService.currentProjectGallery.subscribe((project)=>{
  		this.currentProject = project;
  		this.cdr.detectChanges();  		
  	})
  }

}
