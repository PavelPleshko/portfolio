import { Component, OnInit, AfterViewInit, Input, ChangeDetectionStrategy,
ChangeDetectorRef } from '@angular/core';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerComponent implements AfterViewInit, OnInit {
@Input() imageUrl: SafeStyle;

  constructor(private cdr: ChangeDetectorRef, private sanitizer: DomSanitizer) { }

  ngOnInit(){
  		this.imageUrl = this.sanitizer.bypassSecurityTrustStyle(`url(${this.imageUrl})`);
  }


  ngAfterViewInit() {

  	this.cdr.detach();
  }

}
