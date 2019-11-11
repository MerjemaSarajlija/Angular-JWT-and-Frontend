import {Component, NgModule, OnInit, ViewChild, ElementRef} from '@angular/core';
import {UserService} from '@app/_services';
import {NgbModal, ModalDismissReasons, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.less']
})

@NgModule({
  providers: [NgbModal,
    NgbModalConfig],
  entryComponents: [TransactionComponent]

})

export class TransactionComponent implements OnInit {



  loading = false;
  transaction: any;

  budgetForm: FormGroup;
  trRes:any;
  budget:any;
  budgetDetailsForm: FormGroup;
  id: any;
  det:any;


  constructor(private userService: UserService,
              config: NgbModalConfig,
              private modalService: NgbModal,
              private router: Router) {
    config.backdrop = 'static';
    config.keyboard = false;
  }


  open(content) {
    this.modalService.open(content);
  }
  opens(details, id) {
    this.userService.getTransactionById(id).subscribe(res => {
          this.det = res;
          this.modalService.open(details);
          }, error => console.log(error)
    );
  }

  ngOnInit() {
    this.getBudget();
  this.loading = true;
  this.userService.getTransaction().subscribe(res => {
    this.transaction = res;
    console.log(this.transaction);
  });
    this.budgetForm = new FormGroup({
      'amount': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required]),
      'budget': new FormControl(null, [Validators.required]),
      'dateTime': new FormControl(null ),
      'type': new FormControl(null),

    });

  }

  addTransaction() {
    const konst = {
      "amount":  this.budgetForm.value.amount,
      "description":  this.budgetForm.value.description,
      "budget":  Number(this.budgetForm.value.budget),
      "datetime":  this.budgetForm.value.datetime,
      "type":  this.budgetForm.value.type};
    this.userService.postTransaction(konst).subscribe(res => {
      this.router.navigate(['/transaction']);
    }, error => console.log(error));
  }

  getBudget(){
  this.userService.getBudget().subscribe(budget => {
  this.loading = false;
  this.budget = budget;
});}







}
