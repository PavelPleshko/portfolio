import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators,FormGroup,FormControl,NgForm,FormGroupDirective} from '@angular/forms';
import {ContactsService} from '../../services/contacts.service';
import {ErrorStateMatcher} from '@angular/material/core';



export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent{
contactForm:FormGroup;
matcher;
submitted:boolean = false;
error:string = '';

  constructor(public fb:FormBuilder,public contactsService:ContactsService) { 
  	this.matcher = new ErrorStateMatcher();
  	this.contactForm = this.fb.group({
  		name:['',Validators.required],
  		subject:[''],
  		email:['',[Validators.email,Validators.required]],
  		message:['',Validators.required]
  	})
  }

  submitForm(){
  	if(this.contactForm.valid){
  		this.contactsService.sendEmail(this.contactForm.value)

      .subscribe((data)=>{
        if(data.ok){
          this.submitted = true;
          this.error = '';
        }else{
        this.submitted=true;
        this.error = data.statusText;
      
        }
  			
  		}
     )
  	}
  }

  resetState(){
    this.submitted = false;
    this.error = '';
    this.contactForm.reset();
  }

}
