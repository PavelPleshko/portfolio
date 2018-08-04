import { Component,OnInit} from '@angular/core';
import {ContentService} from './shared/services/content.service';
import {forkJoin} from 'rxjs/observable/forkJoin';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Location, PopStateEvent } from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
socials=[];
resumeUrl:any;
yScrollStack: number[] = [];
lastPoppedUrl: string;

 constructor(private contentService:ContentService,
 	private router:Router,private location: Location){

 }

ngOnInit(){
	let mainSub = forkJoin(this.contentService.getSocials(),this.contentService.getResume()).
	subscribe(data=>{
		this.socials = data[0];
		this.resumeUrl = data[1][0].resume.fields.file.url;;
	});
	 this.location.subscribe((ev:PopStateEvent) => {
            this.lastPoppedUrl = ev.url;
        });
        this.router.events.subscribe((ev:any) => {
            if (ev instanceof NavigationStart) {
                if (ev.url != this.lastPoppedUrl)
                    this.yScrollStack.push(window.scrollY);
            } else if (ev instanceof NavigationEnd) {
                if (ev.url == this.lastPoppedUrl) {
                    this.lastPoppedUrl = undefined;
                    window.scrollTo(0, this.yScrollStack.pop());
                } else
                    window.scrollTo(0, 0);
            }
        });
}
}
