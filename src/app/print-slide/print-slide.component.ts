import { Component,Input, OnInit,Pipe,PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

@Component({
  selector: 'app-print-slide',
  templateUrl: './print-slide.component.html',
  styleUrls: ['./print-slide.component.scss']
})
export class PrintSlideComponent implements OnInit {
 @Input() meta:any;
  constructor() { }

  ngOnInit() {
  }

}
