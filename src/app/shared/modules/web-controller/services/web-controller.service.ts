import { Injectable,Inject } from '@angular/core';
import {WINDOW} from './window';
import {CONFIG,WebControllerConfig} from '../config/config';
import {CommandsService} from '../../../services/commands.service';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
import {defer} from 'rxjs/observable/defer';
import {filter,tap,takeUntil,share,switchMap} from 'rxjs/operators';

@Injectable()
export class WebControllerService {
recognition:any;
isActive:boolean = false;
config:WebControllerConfig;
currentPhrase:BehaviorSubject<string>=new BehaviorSubject('');
recognitionActive:BehaviorSubject<boolean> = new BehaviorSubject(false);
toggleRecognition:Subject<boolean> = new Subject();

  constructor(@Inject(WINDOW) private _window:Window,@Inject(CONFIG) configs:WebControllerConfig[],
  	private commandsService:CommandsService) {
  	
  	this.config = this.mergeConfigs(configs);
  	let Recognition = this.isRecognitionSupported();
  	if(Recognition){
  		this.recognition = new Recognition();
  		
  		this.recognition.onend = ()=>{
  			this.recognition.start();
  		}
  		let start = this.toggleRecognition.pipe(
  			tap((val)=>{
	  			if(val && this.recognition){
	  				this.recognition.start();
	  				this.isActive = true;
	  			}else if(!val && this.recognition){
	  				this.recognition.stop();
	  				this.isActive = false;
	  			}
  			}),
  			switchMap(()=>defer(()=>startOrStopEmision)),
  			filter(value=>this.recognitionActive.getValue() 
  				&& !this.includesStartOrStopCommand(value)));

  		this.recognition.onresult = (e) =>{

  			let last = e.results.length-1;
  			let phrase = e.results[last][0].transcript;
  			console.log(phrase);
  			this.currentPhrase.next(phrase);
  		}  

  		let startOrStopEmision = this.currentPhrase.pipe(tap(value=>{
  			let startPhrase:string = this.config.startKeyPhrase;
  			let stopPhrase:string = this.config.stopKeyPhrase;
  			if(value.includes(startPhrase)){
  				this.recognitionActive.next(true);
  			}else if(value.includes(stopPhrase)){
  				this.recognitionActive.next(false);
  			}
  		}));

  		let worker = start.subscribe(data=>{
  			this.commandsService.analyze(data);
  		});
  		this.startRecognition();
  	}
   }

 

  startRecognition():void{
   		Object.assign(this.recognition,this.config);
   		this.toggleRecognition.next(true);
   }

  isRecognitionSupported():any{
  	if(typeof this._window != 'undefined'){
  		let supported = this.getSpeechRecognitionApi();
  		return supported;
  	}
  	return false;
  }


  stopManually(){
  	if(this.isActive){
  		 this.isActive = false;
  		 this.toggleRecognition.next(false);
  	}
  } 

   getSpeechRecognitionApi(){
  		let api = this._window['SpeechRecognition'] || this._window['webkitSpeechRecognition'];
  		return api;
  }

   mergeConfigs(configs:WebControllerConfig[]):WebControllerConfig{
   		return configs.filter(config=>!!(config)==true).reduce((acc:any={},cur:WebControllerConfig)=>{
   			return {...acc,...cur};
   		});
   }

   includesStartOrStopCommand(value:string):boolean{
  	let startCommand = this.config.startKeyPhrase;
  	let stopCommand = this.config.stopKeyPhrase;
  	return value.includes(startCommand) || value.includes(stopCommand);
  }
}
