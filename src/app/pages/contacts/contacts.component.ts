import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/Models/contact';
import { ContactGroup } from 'src/app/Models/contact-group';
import { ContactGroupsService } from 'src/app/services/contact-groups.service';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  public isDataLoading = false;
  public isAddingNewData = false;
  public isEditingData = false;
  fgContactType!: FormGroup;
  responseData: Contact[] = [];
  contactGroupsData: ContactGroup[] = [];
  contact!: Contact;

  constructor(public contactsApiService: ContactsService,
    public contactGroupsApiService: ContactGroupsService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getAllContacts();
    this.getAllContactGroups();
  }

  getAllContactGroups(): void {
    this.isDataLoading = true;
    this.contactGroupsApiService.getAllContactGroups().subscribe({
      next: (resp) => {
        const dataList = resp;
        this.contactGroupsData = dataList;
      },
      error: (e) => {
        console.log(e);
      }
    });
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
      }
    });
  }

  addNew() {
    this.createFormGroup();
    this.isAddingNewData = true;
  }

  discard() {
    this.isAddingNewData = false;
  }

  createFormGroup(id: number = 0) {
    this.fgContactType = this.formBuilder.group({
      id: [id],
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      contactType: ['', Validators.required],
      contactGroupId: ['', [Validators.required, Validators.min(1)]],
    });
  }

  save() {
    if (this.fgContactType.valid) {
      this.isDataLoading = true;
      const newContact = this.fgContactType.value;
      this.contactsApiService.addContact(newContact).subscribe({
        next: (resp) => {
          this.getAllContacts();
          this.isAddingNewData = false;
        },
        error: (e) => {
          this.isDataLoading = false;
          alert(e);
          console.log(e);
        }
      });
    }
  }

  editRow(id: number) {
    this.createFormGroup(id);
    this.isEditingData = true;
  }

  discardEdit() {
    this.isEditingData = false;
  }

  edit() {
    if (this.fgContactType.get('contactType')?.valid) {
      this.isDataLoading = true;
      const newContact = this.fgContactType.value;
      this.contactsApiService.editContact(newContact).subscribe({
        next: (resp) => {
          this.getAllContacts();
          this.isEditingData = false;
        },
        error: (e) => {
          this.isDataLoading = false;
          alert(e);
          console.log(e);
        }
      });
    }
  }

  delete(id: number) {
    debugger;
    this.isDataLoading = true;
    this.contactsApiService.deleteContact(id).subscribe({
      next: (resp) => {
        this.getAllContacts();
      },
      error: (e) => {
        alert(e);
        console.log(e);
      }
    });
  }

}
