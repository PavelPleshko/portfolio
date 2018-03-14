import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import {RouterModule, Routes } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ContentService} from './shared/services/content.service';
import {DataLoadService} from './shared/services/data-load.service';

import {SharedModule} from './shared/shared.module';
import {MainModule} from './main/main.module';

import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {environment} from '../environments/environment';
import { PrintSlideComponent } from './print-slide/print-slide.component';



const routes:Routes = [
{path:'home',loadChildren:'./main/main.module#MainModule'},
{path:'contacts',loadChildren:'./contacts/contacts.module#ContactsModule'},
{path:'projects',loadChildren:'./projects/projects.module#ProjectsModule'},
{path:'',pathMatch:'full',redirectTo:'home'},
{path:'**',redirectTo:'home'}
];


export const MODULES = [
BrowserModule,RouterModule.forRoot(routes),
BrowserAnimationsModule,SharedModule,MainModule,NgbModule.forRoot(),
ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production})
];



@NgModule({
  declarations: [
    AppComponent,
    PrintSlideComponent,
  ],
  imports: [
    ...MODULES
  ],
  
  providers: [ContentService,DataLoadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
