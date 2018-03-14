import { Component, OnInit,Input } from '@angular/core';
import {
    DomSanitizer,
    SafeStyle
} from '@angular/platform-browser';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-project-single-modal',
  templateUrl: './project-single-modal.component.html',
  styleUrls: ['./project-single-modal.component.scss']
})
export class ProjectSingleModalComponent implements OnInit {
safeExtraImages = [];
@Input() project;
  constructor(private sanitization:DomSanitizer,private ngb:NgbActiveModal) { }

  ngOnInit() {
  	this.project.extraImages.forEach(img=>{
  		let safeImg = this.sanitization.bypassSecurityTrustStyle(`url(https:${img.fields.file.url})`);
  		this.safeExtraImages.push(safeImg);
  	})
  }

closeModal(){
	this.ngb.close();
}
}
