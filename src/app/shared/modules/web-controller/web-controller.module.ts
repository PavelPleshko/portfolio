import { NgModule,ModuleWithProviders,Optional,SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import {WebControllerService} from './services/web-controller.service';
import {CONFIG,defaultConfig,WebControllerConfig} from './config/config';
import {WINDOW_PROVIDERS} from './services/window';
import {COMMANDS} from './services/commands';
import {USER_COMMANDS} from './tokens/user-commands.token';
import {CommandsService} from '../../services/commands.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class WebControllerModule {


	static forRoot(userCommands,commands,config?:WebControllerConfig):ModuleWithProviders<any>{
		return {
			ngModule:WebControllerModule,
			providers:[
			{provide:CONFIG,useValue:defaultConfig,multi:true},
			{provide:CONFIG,useValue:config,multi:true},
			{provide:COMMANDS,useValue:commands},
			{provide:USER_COMMANDS,useValue:userCommands},
			WINDOW_PROVIDERS,
			WebControllerService,
			CommandsService
			]
		}
	}
 }
