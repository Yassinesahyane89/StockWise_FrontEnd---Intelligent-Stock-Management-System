import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {LoginRequest} from "../../../../../shared/models/request/login-request.model";

import {AuthService} from "../../../../../core/services/auth/auth.service";
import {CoreConfigService } from '@core/services/config.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthLoginComponent implements OnInit {
  // public
  public loginRequest: LoginRequest = {} as LoginRequest;
  public contentHeader: object;
  public passwordTextType: boolean;

  constructor(
      private toastr: ToastrService,
      private route: ActivatedRoute,
      private router: Router,
      private authService: AuthService,
      private coreConfigService: CoreConfigService
  ) {
    // Configure the layout
    this.coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        menu: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        customizer: false,
        enableLocalStorage: false
      }
    };
  }

  // handle error case
  handleError(error,form) {
    if (error.error && error.error.message) {
      // show toast
      this.toastr.error(error.error.message, 'Progress Bar', {
        progressBar: true,
        toastClass: 'toast ngx-toastr',
        closeButton: true
      });
    }else if (error && error.error) {
      const validationErrors = error.error;

      Object.keys(validationErrors).forEach((key) => {
        const control = form.controls[key];
        console.log("====================================")
        console.log(control);
        if (control) {
          control.setErrors({serverError: validationErrors[key].join(', ')});
        }
      });
    }
  }

  //Toggle password
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  // user form submitted
  loginFomrSubmitted(UserForm: any) {
    this.authService.login(this.loginRequest).subscribe(
        (response: any) => {
          this.toastr.success('login Successfully');
          this.router.navigate(['/home']);
        },(error) => {
          this.handleError(error,UserForm);
        }
    )
  }

  // Lifecycle Hooks
  ngOnInit() {

  }
}