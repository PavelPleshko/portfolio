import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators/catchError';
import {of} from 'rxjs/observable/of';

@Injectable()
export class ContactsService {

  constructor(public http:HttpClient) { }

 sendEmail(data):Observable<any>{

 	return this.http.post('http://localhost:3000/send',data).pipe(catchError(err=>of(err)));
 }
}
