import { Injectable } from '@angular/core';
import {createClient,ContentfulClientApi} from 'contentful';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {fromPromise} from 'rxjs/observable/fromPromise';
import {map} from 'rxjs/operators';


@Injectable()
export class ContentService {
client:ContentfulClientApi;
  constructor() {
  this.client = createClient({
  	space:environment.contentful.space_id,
  	accessToken:environment.contentful.access_token
  })
 
}

getSkillsets(){
	const promise = this.client.getEntries({
		content_type:'skillset'
	});
	return fromPromise(promise).pipe(map(this.transformCollection));
}

getAboutInfo(){
	const promise = this.client.getEntries({
		content_type:'about'
	});
	return fromPromise(promise).pipe(map(this.transformCollection));
	}


getStatus(){
	const promise = this.client.getEntries({
		content_type:'status'
	});
	return fromPromise(promise).pipe(map(this.transformCollection));
}


getWebproducts(){
	const promise = this.client.getEntries({
		content_type:'webproducts'
	});
	return fromPromise(promise).pipe(map(this.transformCollection));
}

getProjects(){
	const promise = this.client.getEntries({
		content_type:'project'
	});
	return fromPromise(promise).pipe(map(this.transformCollection),map(items=>items.reverse()));
}

getSocials(){
	const promise = this.client.getEntries({
		content_type:'socials'
	});
	return fromPromise(promise).pipe(map(this.transformCollection));
}

getResume(){
		const promise = this.client.getEntries({
		content_type:'resume'
	});
	return fromPromise(promise).pipe(map(this.transformCollection));
}



	transformCollection(entryCollection){
		return entryCollection.items.map(item=>{
			return item.fields})
		.sort((item,item2)=>item.id - item2.id);
	}
}
