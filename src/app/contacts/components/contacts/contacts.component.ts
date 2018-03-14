import { Component, OnInit } from '@angular/core';
import {DataLoadService} from '../../../shared/services/data-load.service';
import {ContentService} from '../../../shared/services/content.service';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
webproducts;
  constructor(private dataLoadService:DataLoadService,private contentService:ContentService) { 
 
}

  ngOnInit() {
  	this.dataLoadService.startLoadingContent();
this.contentService.getWebproducts().subscribe((webproducts)=>{
	this.webproducts = webproducts;
	this.dataLoadService.stopLoadingContent();
})


  }

}
