import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactGroup } from 'src/app/Models/contact-group';
import { ContactGroupsService } from 'src/app/services/contact-groups.service';

@Component({
  selector: 'app-contact-groups',
  templateUrl: './contact-groups.component.html',
  styleUrls: ['./contact-groups.component.scss']
})
export class ContactGroupsComponent implements OnInit {

  public isDataLoading = false;
  public isAddingNewData = false;
  fgContactGroup!: FormGroup;
  responseData: ContactGroup[] = [];

  constructor(public contactGroupsApiService: ContactGroupsService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getAllContactGroups();
  }

  getAllContactGroups(): void {
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
    this.createFormGroup();
    this.isAddingNewData = true;
  }

  discard() {
    this.isAddingNewData = false;
  }

  createFormGroup() {
    this.fgContactGroup = this.formBuilder.group({
      groupName: ['', Validators.required]
    });
  }

  save() {
    if (this.fgContactGroup.valid) {
      this.isDataLoading = true;
      const newContactGroup = this.fgContactGroup.value;
      this.contactGroupsApiService.addContactGroup(newContactGroup).subscribe({
        next: (resp) => {
          this.getAllContactGroups();
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

}
