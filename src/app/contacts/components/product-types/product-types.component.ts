import { Component, OnInit,Input,ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-product-types',
  templateUrl: './product-types.component.html',
  styleUrls: ['./product-types.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProductTypesComponent implements OnInit {
@Input() webproducts;
  constructor() { }

  ngOnInit() {
  }

}
