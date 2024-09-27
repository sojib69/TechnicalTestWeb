import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, of, retry } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Contact } from '../Models/contact';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'jwt-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http: HttpClient) { }

  // GET data by ID
  getContactById(id: any): Observable<any> {
    return this.http.get<Contact>(environment.apiUrl + id).pipe(
      retry(3), catchError(this.handleError<Contact>('getContactById')));
  }

  getAllContacts(): Observable<any> {
    return this.http.get<Contact[]>(environment.apiUrl+'Contacts/GetAllContacts').pipe(
      retry(3), catchError(this.handleError<Contact[]>('getAllContacts', [])));
  }

  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(environment.apiUrl, contact, httpOptions)
      .pipe(
        catchError(this.handleError('addContact', contact))
      );
  }

  editContact(contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(environment.apiUrl, contact, httpOptions)
      .pipe(
        catchError(this.handleError('editContact', contact))
      );
  }

  deleteContact(contact: Contact): Observable<Contact> {
    return this.http.delete<Contact>(environment.apiUrl, httpOptions)
      .pipe(
        catchError(this.handleError('deleteContact', contact))
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