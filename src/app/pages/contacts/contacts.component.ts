import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/Models/contact';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  public isDataLoading = false;
  fgContactType!: FormGroup;
  responseData: Contact[] = [];

  constructor(public contactsApiService: ContactsService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getAllContacts();
  }

  getAllContacts(): void {
    this.isDataLoading = true;
    this.contactsApiService.getAllContacts().subscribe({
      next: (resp) => {
        const dataList = resp;
        this.responseData = dataList;
        this.isDataLoading = false;
      },
      error: (e) => {
        this.isDataLoading = false;
        console.log(e);
      },
      complete: () => console.info('complete')
    });
  }

  addNew() {
    
  }

  remove(index: number) {
    const control = <FormArray>this.fgContactType.get('contacts');
    control.removeAt(index);
  }

  save() {
    console.log('isValid', this.fgContactType.valid);
    console.log('value', this.fgContactType.value);
  }

}
