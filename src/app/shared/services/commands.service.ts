import {Router} from '@angular/router';
import { Injectable,Inject } from '@angular/core';
import {USER_COMMANDS} from '../modules/web-controller/tokens/user-commands.token';

export interface Command {
	keywords:Array<string>;
	execute:Function;
	response:string;
}

@Injectable()
export class CommandsService{

	commands:Command[];
	lastCommandIndex:number;
	response:SpeechSynthesis;
	repeatPhrases:Array<string> = [
	'repeat','do it again','again','more'
	];
	voice:any;
	constructor(private router:Router,
		@Inject(USER_COMMANDS) private userCommands:Function
		){

		this.init();
		this.response =window.speechSynthesis;
		this.setVoice(this.response);
	}

 analyze(phrase:string){
 		let responded = false;
		for(let i = 0; i<this.commands.length;i++){
			let iteration = this.commands[i];
			if(this.includesKeyword(phrase,iteration.keywords)){
				this.lastCommandIndex = i;
				iteration.execute && iteration.execute();

				this.respondWith(iteration.response,this.response);
				responded = true;
				break;
			}
		}
			if(!responded && this.includesKeyword(phrase,this.repeatPhrases)){
 			let command = this.commands[this.lastCommandIndex];
 			command.execute();
 			this.respondWith('Sure',this.response);
 			return;
 		}
	}

	init(){
		this.commands = this.userCommands.call(this);

	}

	includesKeyword(keyword,arr){
		let includes = false;
		for(let i = 0; i<arr.length;i++){
			if(~keyword.indexOf(arr[i])){
				includes = true;
				break;
			}
	}
	return includes;
}

respondWith(text:string,speakInstance:SpeechSynthesis):void{
	let utterance = new SpeechSynthesisUtterance(text);
	utterance.voice = this.voice;
	console.log(this.voice)
	speakInstance.speak(utterance);

}

setVoice(speech:SpeechSynthesis){
	speech.onvoiceschanged = () =>{
		let voices = speech.getVoices();
		this.voice = voices[3];
	}

}

} 