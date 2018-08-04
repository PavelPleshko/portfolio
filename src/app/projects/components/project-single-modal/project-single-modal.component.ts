import { Component, OnInit,Input } from '@angular/core';
import {
    DomSanitizer,
    SafeStyle
} from '@angular/platform-browser';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ContentService} from '../../../shared/services/content.service';

@Component({
  selector: 'app-project-single-modal',
  templateUrl: './project-single-modal.component.html',
  styleUrls: ['./project-single-modal.component.scss']
})
export class ProjectSingleModalComponent implements OnInit {
safeExtraImages = [];
@Input() project:any;
  constructor(private sanitization:DomSanitizer,private ngb:NgbActiveModal,private contentService:ContentService) { }

  ngOnInit() {
  	this.project.extraImages.forEach(img=>{
  		let safeImg = this.sanitization.bypassSecurityTrustStyle(`url(https:${img.fields.file.url})`);
  		this.safeExtraImages.push(safeImg);
  	})
  }

closeModal(){
	this.ngb.close();
}

openGalleryFor(){
  this.contentService.openGalleryFor(this.project);
}
}
