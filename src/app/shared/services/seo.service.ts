import { Injectable,Inject } from '@angular/core';
import {NavigationEnd,Router,RouterEvent,ActivatedRoute} from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import {filter,map,mergeMap} from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

import {defaultMetaItem} from '../../seo/metaData';

@Injectable({
	providedIn:'root'
})
export class SeoService {
canonicalLinks:any={};

	constructor(
		@Inject(DOCUMENT) private doc,
		private router:Router,private route:ActivatedRoute,
		private metaService:Meta,
		private titleService:Title
		){
		this.router.events.pipe(
			filter((event:RouterEvent)=>event instanceof NavigationEnd),
			map(event=>{
				let route = this.route
				while (route.firstChild) route = route.firstChild;
   			    return route;
			}),
			filter((route) => route.outlet === 'primary'),
			mergeMap(route=>route.data)
			)
		.subscribe((event)=>{
				this.createLinkForCanonicalURL();
				this.titleService.setTitle(event['title'] || defaultMetaItem.title);
				this.metaService.updateTag({name:'description',content:event['desc'] || defaultMetaItem.desc});
		})
	}

createLinkForCanonicalURL(){
	try{
		let url:string = this.doc.URL;
		if(this.canonicalLinks[url]){
			return;
		}else{
			this.canonicalLinks[url]=true;
			let link: HTMLLinkElement = this.doc.createElement('link');
		    link.setAttribute('rel', 'canonical');
		    this.doc.head.appendChild(link);
		    link.setAttribute('href', url);  
		}
		
	}catch(err){

	}

	}     
}


