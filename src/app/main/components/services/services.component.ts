import { Component, OnInit,Input,ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ServicesComponent implements OnInit {
@Input() services;
  constructor() { }

  ngOnInit() {
  }

}
