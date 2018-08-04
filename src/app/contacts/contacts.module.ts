import { NgModule } from '@angular/core';
import {RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import {SharedModule} from '../shared/shared.module';
import {ContactsService} from './services/contacts.service';

export const routes:Routes = [
{path:'',component:ContactsComponent}
];

export const MODULES = [
SharedModule,RouterModule.forChild(routes)
];

@NgModule({
  imports: [
   ...MODULES
  ],
  providers:[ContactsService],
  declarations: [ContactsComponent, ContactFormComponent]
})
export class ContactsModule { }
