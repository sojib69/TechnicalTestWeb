import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { DataSourceRequestState } from '@progress/kendo-data-query';
import { ModuleConstants } from 'src/app/core/constants/constants';
import { Contact } from 'src/app/Models/contact';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  public gridData!: GridDataResult;
  public isDataLoading = false;
  public pageSize: any = false;
  state: DataSourceRequestState = {
    skip: 0,
    take: ModuleConstants.kendoGridDefaultTake_20,
  };
  requiredValidation: any;
  fgContactType!: FormGroup;

  constructor(public contactsApiService: ContactsService,) { }

  ngOnInit(): void {
    this.getAllContacts();
  }

  getAllContacts(): void {
    this.contactsApiService.getAllContacts().subscribe({
      next: (resp) => {
        const dataList = resp;
        const listData: Contact[] = dataList;
        this.populateGrid(listData);
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => console.info('complete')
    });
  }

  /**
   * Populates grid with data
   * @param dataList : data array
   */
  private populateGrid(dataList: any) {
    this.gridData = dataList;
  }

}
