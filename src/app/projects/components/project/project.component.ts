import { Component, OnInit,Input,ChangeDetectionStrategy } from '@angular/core';
import {
    DomSanitizer,
    SafeStyle
} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProjectSingleModalComponent} from '../project-single-modal/project-single-modal.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
  entryComponents:[ProjectSingleModalComponent]
})
export class ProjectComponent implements OnInit {
@Input() project;
@Input() index;
image:SafeStyle;
isOdd:boolean = false;
  constructor(private sanitization:DomSanitizer,private modalService:NgbModal) { }

  ngOnInit() {
  	this.image = this.sanitization.bypassSecurityTrustStyle(`url(https:${this.project.mainImg.fields.file.url})`);
    this.isOdd = this.checkIsOdd(this.index);
  }

checkIsOdd(index:number){
  console.log(index, index % 2);
  return Number(index) % 2 ===0;
}
openModal(){
	const ref = this.modalService.open(ProjectSingleModalComponent,{size:'lg',windowClass:'app-modal-window'});
	ref.componentInstance.project = this.project;
}
}
