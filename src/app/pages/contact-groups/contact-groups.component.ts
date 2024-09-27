import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ContactGroup } from 'src/app/Models/contact-group';
import { ContactGroupsService } from 'src/app/services/contact-groups.service';

@Component({
  selector: 'app-contact-groups',
  templateUrl: './contact-groups.component.html',
  styleUrls: ['./contact-groups.component.scss']
})
export class ContactGroupsComponent implements OnInit {

  public isDataLoading = false;
  fgContactType!: FormGroup;
  responseData: ContactGroup[] = [];

  constructor(public contactGroupsApiService: ContactGroupsService) { }

  ngOnInit(): void {
    this.getAllContacts();
  }

  getAllContacts(): void {
    this.isDataLoading = true;
    this.contactGroupsApiService.getAllContactGroups().subscribe({
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
