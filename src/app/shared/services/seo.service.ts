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

	constructor(
		@Inject(DOCUMENT) private doc,
		private router:Router,private route:ActivatedRoute,
		private metaService:Meta,
		private titleService:Title
		){
		this.createLinkForCanonicalURL();
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
				this.titleService.setTitle(event['title'] || defaultMetaItem.title);
				this.metaService.updateTag({name:'description',content:event['desc'] || defaultMetaItem.desc});
		})
	}

createLinkForCanonicalURL(){
	try{
		let link: HTMLLinkElement = this.doc.createElement('link');
	    link.setAttribute('rel', 'canonical');
	    this.doc.head.appendChild(link);
	    link.setAttribute('href', this.doc.URL);  
	}catch(err){
		
	}

	}     
}

}
