import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { CoreConfigService } from '@core/services/config.service';
import {RegisterRequest} from "../../../../shared/models/request/register-request.model";

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthRegisterComponent implements OnInit {

  //  Public
  public coreConfig: any;
  public registerForm: UntypedFormGroup;
  public loading = false;
  public submitted = false;
  public error = '';
  public passwordTextType: boolean;
  public registerRequest: RegisterRequest = {} as RegisterRequest;


  constructor(
      private _coreConfigService: CoreConfigService,
      private _formBuilder: UntypedFormBuilder,
      private _route: ActivatedRoute,
      private _router: Router
  ) {

    // Configure the layout
    this._coreConfigService.config = {
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

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  /**
   * Toggle password
   */
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
  }
  /**
   * On init
   */
  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

}
