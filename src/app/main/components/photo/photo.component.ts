import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import {
    DomSanitizer,
    SafeStyle
} from '@angular/platform-browser';
import {slideInOutWithFadeLeft, slideInOutWithFadeRight} from '../../../animations/animations';

export interface IAbout{
  id: number;
  title: string;
  body?: string;
  file?: any;
}
@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
  animations: [slideInOutWithFadeLeft, slideInOutWithFadeRight]
})
export class PhotoComponent implements OnChanges {
@Input() abouts: IAbout[];
@Input() animationState: string;
@Input() resumeLink: string;
image: SafeStyle;
rightColumn;
leftColumn;
@Output() contentLoaded = new EventEmitter();

  constructor(public sanitization: DomSanitizer) {

}

  ngOnChanges() {
    if (this.abouts && this.resumeLink){
       this.organizeEntries();
    }

  }

  organizeEntries(){
    this.rightColumn = this.abouts[1];
    this.rightColumn.resumeLink = this.resumeLink;
    this.leftColumn = this.abouts[0];
     this.image = this.sanitization.bypassSecurityTrustStyle(`url(https:${this.abouts[2].file.fields.file.url})`);


  }

  onContentLoaded(){
    this.contentLoaded.next(true);
  }

}
