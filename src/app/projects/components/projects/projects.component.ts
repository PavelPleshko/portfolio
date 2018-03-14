import { Component, OnInit } from '@angular/core';
import {ContentService} from '../../../shared/services/content.service';
import {take} from 'rxjs/operators';
import {DataLoadService} from '../../../shared/services/data-load.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
projects;
  constructor(private contentService:ContentService,private dataloadService:DataLoadService) { }

  ngOnInit() {
  	this.dataloadService.startLoadingContent();
  	this.contentService.getProjects().pipe(take(1)).subscribe((projects)=>{
  		this.projects = projects;
  		this.dataloadService.stopLoadingContent();
  	})
  }

}
