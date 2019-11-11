import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }


  getBudget() {
    return this.http.get(`${environment.apiUrl}/budget`);
  }

  postBudget(budget) {
    return this.http.post(`${environment.apiUrl}/budget`, budget);
  }

  getBudgetById(Id) {
    return this.http.get(`${environment.apiUrl}/budget/${Id}`);
  }
  addUser(Id, USER) {
    return this.http.put(`${environment.apiUrl}/budget/${Id}/beneficiary`, USER);
  }
  postTransaction(transaction) {
    return this.http.post(`${environment.apiUrl}/transaction`, transaction);
  }
  getTransaction() {
    return this.http.get(`${environment.apiUrl}/transaction`);
  }
  getTransactionById(Id) {
    return this.http.get(`${environment.apiUrl}/transaction/${Id}`);
  }

}
