import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ServiceWorkerModule} from '@angular/service-worker';
import {RouterModule, Routes,PreloadAllModules } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientXsrfModule,HttpClientModule} from '@angular/common/http';

import {SharedModule} from './shared/shared.module';
import {MainModule} from './main/main.module';

import {ContentService} from './shared/services/content.service';
import {DataLoadService} from './shared/services/data-load.service';

import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {environment} from '../environments/environment';

//import {WebControllerModule} from './shared/modules/web-controller/web-controller.module';
//import {CommandsService} from './shared/services/commands.service';
//import {commands} from './shared/commands';
import {metaData} from './seo/metaData';


const routes:Routes = [
{path:'home',loadChildren:'./main/main.module#MainModule',data:metaData.home},
{path:'contacts',loadChildren:'./contacts/contacts.module#ContactsModule',data:metaData.contacts},
{path:'projects',loadChildren:'./projects/projects.module#ProjectsModule',data:metaData.projects},
{path:'',pathMatch:'full',redirectTo:'home',data:metaData.home},
{path:'**',redirectTo:'home'}
];


export const MODULES = [
BrowserModule.withServerTransition({ appId: 'portfolio' }),RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules}),
BrowserAnimationsModule,SharedModule,MainModule,NgbModule.forRoot(),
ServiceWorkerModule.register('/ngsw-worker.js',{enabled:environment.production}),
HttpClientModule,
HttpClientXsrfModule.withOptions({cookieName:'csrfToken',headerName:'CSRF-Token'})
//WebControllerModule.forRoot(commands,CommandsService,{continuous:true})
];

export const PROVIDERS = [
ContentService,DataLoadService
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ...MODULES
  ],
  providers: [...PROVIDERS],
  bootstrap: [AppComponent]
})

export class AppModule { }
