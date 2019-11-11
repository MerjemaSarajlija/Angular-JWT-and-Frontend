import { Component, NgModule } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService, AuthenticationService } from '@app/_services';
import { MatDialog } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({ templateUrl: 'home.component.html' })

export class HomeComponent {

  budgetForm: FormGroup;
  userForm: FormGroup;
  userRes: any;
  id: any;
  loading = false;
  budget: any;
  el: any;
  budgetDetailsArray: any;
  budgetId: any;


  constructor(private userService: UserService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.loading = true;
    this.userService.getBudget().subscribe(budget => {
      this.budget = budget;
    });
    this.budgetForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'amount': new FormControl(null, [Validators.required]),
      'dateTo': new FormControl(null),
      'dateFrom': new FormControl(null),
    });

    this.userForm = new FormGroup({
      'beneficary': new FormControl(null, [Validators.required]),
    });
  }

  addBudget() {
    const budg = {
      'name': this.budgetForm.value.name,
      'amount': this.budgetForm.value.amount,
      'date_from': this.budgetForm.value.dateFrom,
      'date_to': this.budgetForm.value.dateTo
    };

    this.userService.postBudget(budg).subscribe(budget => {
      console.log('Budget:', budget);
    });
  }

  openBudgetDetails(budgetDetailsModal, id) {
    this.userService.getBudgetById(id).subscribe(res => {
      this.budgetDetailsArray = res;
      this.modalService.open(budgetDetailsModal);
    }, error => console.log(error)
    );
  }

  AddUser() {
    const BODY = { "beneficiary": this.userForm.value.beneficary };
    this.userService.addUser(this.budgetId, BODY).subscribe(res => {
      this.userRes = res;
      console.log(res);

    }, error => console.log(error)
    );
  }

  open(content) {
    this.modalService.open(content);
  }

  openAddUser(id, modal) {
    this.userService.getBudgetById(id).subscribe(res => {
      this.budgetDetailsArray = res;
      this.budgetId = this.budgetDetailsArray.id;
      this.modalService.open(modal);
    }, error => console.log(error)
    );
  }

}
