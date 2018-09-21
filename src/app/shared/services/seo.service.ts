import { Injectable } from '@angular/core';
import {NavigationEnd,Router,RouterEvent,ActivatedRoute} from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import {filter,map,mergeMap} from 'rxjs/operators';

@Injectable({
	providedIn:'root'
})
export class SeoService {
	defaultTitle:string = 'Pleshko Pavel - Portfolio';
	defaultDesc:string = `Pleshko Pavel. Full stack web developer`;

	constructor(private router:Router,private route:ActivatedRoute,
		private metaService:Meta,
		private titleService:Title){
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
				this.titleService.setTitle(event['title'] || this.defaultTitle);
				this.metaService.updateTag({name:'description',content:event['desc'] || this.defaultDesc});
		})
	}


}
