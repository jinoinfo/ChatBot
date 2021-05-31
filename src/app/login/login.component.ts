import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../_services';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    error = '';
    env= environment;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            phoneNumber: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        debugger;
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        console.log('this.f.username.value :: ' + this.f.phoneNumber.value);
        console.log('this.f.password.value :: ' + this.f.password.value);

        let userObject = {
            phoneNumber: this.f.phoneNumber.value ? this.f.phoneNumber.value : undefined,
            password: this.f.password.value ? this.f.password.value : undefined
        };

        this.authenticationService.authenticateUser(userObject)
            .subscribe((res) => {
                console.log('res :: ' + JSON.stringify(res));
                if (res && res.valid && res.valid === true) {
                    localStorage.setItem('currentUser', JSON.stringify(res));
                    this.env.isLoggedin = true; 
                    console.log('navigate to home page');
                    this.router.navigate(['home']);
                } else {
                    this.error = 'Invalid credentials';
                    this.loading = false;
                }
            },
                error => {
                    this.error = error;
                    this.loading = false;
                });

        
    }
}

