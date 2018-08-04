import { Component, AfterViewInit,Input,ChangeDetectionStrategy,
ChangeDetectorRef } from '@angular/core';
import {DomSanitizer,SafeStyle} from '@angular/platform-browser';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class BannerComponent implements AfterViewInit {
@Input() imageUrl:SafeStyle;

  constructor(private cdr:ChangeDetectorRef) { }

 

  ngAfterViewInit() {
  	this.cdr.detach();
  }

}
