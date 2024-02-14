import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.scss']
})
export class TestComponentComponent {
  userForm = this.fb.group({
    firstName: ['', Validators.required], 
    lastName: [''],
    address: this.fb.group({
      street: [''],
      postCode: ['', Validators.required]
    })
  });

  constructor(private fb: FormBuilder) { };

  addUser() {
    console.log(this.userForm.value);
  }
}
