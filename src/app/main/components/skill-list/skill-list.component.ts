import { Component,AfterContentInit,Input,Output,EventEmitter,ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SkillListComponent implements AfterContentInit {
@Input() skills;
@Output() contentLoaded = new EventEmitter();


  constructor() { }

  ngAfterContentInit() {
  
  		this.contentLoaded.next(true);
  	
  }

}
