import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {RegisterRequest} from "../../../../../shared/models/request/register-request.model";

import {AuthService} from "../../../../../core/services/auth/auth.service";
import {CoreConfigService } from '@core/services/config.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthRegisterComponent implements OnInit {
  // public
  public registerReq: RegisterRequest = {} as RegisterRequest;
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
  registerFomrSubmitted(UserForm: any) {
    this.authService.register(this.registerReq).subscribe(
      (response) => {
        this.toastr.success('Register Successfully');
        this.router.navigate(['user-management/auth/login']);
      },
      (error) => {
        this.handleError(error,UserForm);
      }
    );
  }

  // Lifecycle Hooks
  ngOnInit() {

  }


}
