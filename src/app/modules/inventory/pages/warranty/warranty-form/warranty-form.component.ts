import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {WarrantyRequest} from "app/shared/models/request/warranty-request.model";

import {ToastrService} from "ngx-toastr";
import {WarrantyService} from "app/core/services/warranty/warranty.service";
import {BrandRequest} from "../../../../../shared/models/request/brand-request.model";

@Component({
  selector: 'app-warranty-form',
  templateUrl: './warranty-form.component.html',
  styleUrls: ['./warranty-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WarrantyFormComponent implements OnInit {
    //public
    public warrantyReq: any = {} as WarrantyRequest;
    public pageType: string;
    public pageTitle: string;
    public warrantyID: number;
    public contentHeader: object;
    constructor(
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private router: Router,
        private warrantyService: WarrantyService
    ) { }

    // handle success case
    handleSuccess(response,form) {
      // redirect to warranty list /inventory/warranty/list
      this.router.navigate(['/inventory/warranty/list']);

      // show toast
      this.toastr.success(response.message, 'Progress Bar', {
        progressBar: true,
        toastClass: 'toast ngx-toastr',
        closeButton: true
      });

      //form.reset();
      form.reset();
      this.warrantyReq = {} as WarrantyRequest;
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
          if (control) {
            control.setErrors({serverError: validationErrors[key].join(', ')});
          }
        });
      }
    }

    // create warranty
    createWarranty(form) {
      this.warrantyService.createWarranty(this.warrantyReq).subscribe((response: any) => {
        this.handleSuccess(response,form);
      }, (error) => {
        this.handleError(error,form);
      });
    }

    // update warranty
    updateWarranty(form) {
      this.warrantyService.updateWarranty(this.warrantyID,this.warrantyReq).subscribe((response: any) => {
        this.handleSuccess(response,form);
      }, (error) => {
        this.handleError(error,form);
      });
    }

    // get warranty by id
    getWarrantyByID() {
      this.warrantyService.getWarrantyById(this.warrantyID).subscribe((response: any) => {
        this.warrantyReq = response.data;
      });
    }

    // check page type
    checkPageType() {
      if (window.location.href.indexOf('new-warranty') > -1) {
        this.pageType = 'new';
        this.pageTitle = 'add new warranty';
      }else {
        this.pageType = 'edit';
        this.pageTitle = 'edit warranty';
        this.warrantyID = this.route.snapshot.params['id'];
        this.getWarrantyByID();
      }
    }

    // submit warranty form
    warrantyFomrSubmitted(form) {
      if (this.pageType === 'new') {
        this.createWarranty(form);
      }else {
        this.updateWarranty(form);
      }
    }

    ngOnInit(): void {
        // check page type
        this.checkPageType();

        // content header
        this.contentHeader = {
            headerTitle: this.pageTitle,
            actionButton: true,
            breadcrumb: {
            type: '',
            links: [
                {
                name: 'Home',
                isLink: true,
                link: '/'
                },
                {
                name: 'Warranty',
                isLink: true,
                link: '/inventory/warranty/list'
                },
                {
                name: this.pageTitle,
                isLink: false
                }
            ]
            }
        };
    }

}
