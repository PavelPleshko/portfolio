import { Component, OnInit,Input,ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-download-resume',
  templateUrl: './download-resume.component.html',
  styleUrls: ['./download-resume.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class DownloadResumeComponent implements OnInit {
@Input() data;
  constructor() { }

  ngOnInit() {
  }

}
