import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get r() { return this.registerForm.controls; }

  register() {
    if (this.registerForm.invalid) {
      return;
    }
    const signUp = {
      'username': this.r.username.value,
      'password': this.r.password.value
    };
    this.authenticationService.register(signUp).subscribe(
      response => {

      },
      err => {
        this.authenticationService.login(this.r.username.value, this.r.password.value)
          .pipe(first())
          .subscribe(
            data => {
              console.log("sign in");
              this.router.navigate(['/']);
            },
            error => {
              this.error = error;
              this.loading = false;
            });
      });
  }

}
