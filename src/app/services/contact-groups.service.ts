import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, of, retry } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ContactGroup } from '../Models/contact-group';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'jwt-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ContactGroupsService {

  constructor(private http: HttpClient) { }

  getAllContactGroups(): Observable<any> {
    return this.http.get<ContactGroup[]>(environment.apiUrl+'ContactGroups/GetAllContactGroups').pipe(
      retry(3), catchError(this.handleError<ContactGroup[]>('getAllContactGroups', [])));
  }

  addContactGroup(contactGroup: ContactGroup): Observable<ContactGroup> {
    return this.http.post<ContactGroup>(environment.apiUrl+'ContactGroups/AddContactGroup', contactGroup, httpOptions)
      .pipe(
        catchError(this.handleError('addContactGroup', contactGroup))
      );
  }

  editContactGroup(contactGroup: ContactGroup): Observable<ContactGroup> {
    return this.http.put<ContactGroup>(environment.apiUrl+'ContactGroups/EditContactGroup', contactGroup, httpOptions)
      .pipe(
        catchError(this.handleError('editContact', contactGroup))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}