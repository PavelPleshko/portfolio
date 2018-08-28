import {InjectionToken} from '@angular/core';

import {Languages} from './languages';

export interface WebControllerConfig{
	lang?:Languages;
	continuous?:boolean;
	intermediateResults?:boolean;
	startKeyPhrase?:string;
	stopKeyPhrase?:string;
}

export const defaultConfig:WebControllerConfig = {
	lang:'en-US',
	continuous:false,
	intermediateResults:false,
	startKeyPhrase:'start',
	stopKeyPhrase:'stop'
}


export const CONFIG = new InjectionToken<WebControllerConfig>('Config');