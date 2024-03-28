import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {BrandRequest} from "app/shared/models/request/brand-request.model";

import {ToastrService} from "ngx-toastr";
import {BrandService} from "app/core/services/brand/brand.service";

@Component({
    selector: 'app-brand-form',
    templateUrl: './brand-form.component.html',
    styleUrls: ['./brand-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class BrandFormComponent implements OnInit {

    //public
    public brandReq: any = {} as BrandRequest;
    public pageType: string;
    public pageTitle: string;
    public brandID: number;
    public contentHeader: object;
    constructor(
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private router: Router,
        private brandService: BrandService
    ) { }

    // handle success case
    handleSuccess(response,form) {
      // redirect to brand list /inventory/brand/list
      this.router.navigate(['/inventory/brand/list']);

      // show toast
      this.toastr.success(response.message, 'Progress Bar', {
        progressBar: true,
        toastClass: 'toast ngx-toastr',
        closeButton: true
      });

      //form.reset();
      form.reset();
      this.brandReq = {} as BrandRequest;
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

    // create brand
    createBrand(form) {
      this.brandService.createBrand(this.brandReq).subscribe((response: any) => {
        this.handleSuccess(response,form);
      }, (error) => {
        this.handleError(error,form);
      });
    }

    // update brand
    updateBrand(form) {
      this.brandService.updateBrand(this.brandID, this.brandReq).subscribe((response: any) => {
        this.handleSuccess(response,form);
      }, (error) => {
        this.handleError(error,form);
      });
    }

    // get brand by id
    getBrandByID() {
      this.brandService.getBrandById(this.brandID).subscribe((response: any) => {
        this.brandReq = response.data;
      },(error) => {
          this.handleError(error,null);
      });
    }

    // check page type
    checkPageType() {
      if (window.location.href.indexOf('new-brand') > -1) {
        this.pageType = 'new';
        this.pageTitle = 'Add New Brand';
      }else{
        this.pageType = 'edit';
        this.pageTitle = 'Edit Brand';
        this.brandID = this.route.snapshot.params.id;
        this.getBrandByID();
      }
    }

    // submit sub-category
    brandFomrSubmitted(form) {
        if (this.pageType === 'new') {
            this.createBrand(form);
        }else {
            this.updateBrand(form);
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
                        link: '/home'
                    },
                    {
                        name: 'brands',
                        isLink: true,
                        link: '/inventory/brands'
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
