import { Component, Input, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import * as Blazy from 'blazy';
@Component({
  selector: 'app-skill-card',
  templateUrl: './skill-card.component.html',
  styleUrls: ['./skill-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillCardComponent implements OnDestroy{
@Input() skill;
blazy;
  constructor() {
  	 this.blazy = new Blazy({
      selector: '.b-lazy',
      src: 'data-blazy'
    });
  }

  ngOnDestroy(){
this.blazy.destroy();
  }
}
