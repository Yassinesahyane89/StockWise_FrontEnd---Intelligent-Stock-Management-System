import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {UnitRequest} from "app/shared/models/request/unit-request.model";

import {ToastrService} from "ngx-toastr";
import {UnitService} from "app/core/services/unit/unit.service";
import {BrandRequest} from "../../../../../shared/models/request/brand-request.model";

@Component({
  selector: 'app-unit-form',
  templateUrl: './unit-form.component.html',
  styleUrls: ['./unit-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UnitFormComponent implements OnInit {
    //public
    public unitReq: any = {} as UnitRequest;
    public pageType: string;
    public pageTitle: string;
    public unitID: number;
    public contentHeader: object;
    constructor(
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private router: Router,
        private unitService: UnitService
    ) { }

    // handle success case
    handleSuccess(response,form) {
      // redirect to unit list /inventory/unit/list
      this.router.navigate(['/inventory/unit/list']);

      // show toast
      this.toastr.success(response.message, 'Progress Bar', {
        progressBar: true,
        toastClass: 'toast ngx-toastr',
        closeButton: true
      });

      //form.reset();
      form.reset();
      this.unitReq = {} as UnitRequest;
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

    // create unit
    createUnit(form) {
      this.unitService.createUnit(this.unitReq).subscribe(
        response => {
          this.handleSuccess(response,form);
        },
        error => {
          this.handleError(error,form);
        }
      );
    }

    // update unit
    updateUnit(form) {
      this.unitService.updateUnit(this.unitID, this.unitReq).subscribe(
        response => {
          this.handleSuccess(response,form);
        },
        error => {
          this.handleError(error,form);
        }
      );
    }

    // get unit by id
    getUnitByID() {
        console.log(this.unitID)
      this.unitService.getUnitById(this.unitID).subscribe((response: any) => {
          this.unitReq = response.data;
        }, (error) => {
          this.handleError(error,null);
        }
      );
    }

    // check page type
    checkPageType() {
      if (window.location.href.indexOf('new-unit') > -1) {
          this.pageType = 'new';
          this.pageTitle = 'Add New Unit';
      } else {
          this.pageType = 'edit';
          this.pageTitle = 'Edit Unit';
          this.unitID = this.route.snapshot.params.id;
          this.getUnitByID();
      }
    }

    // submit unit
    unitFomrSubmitted(form) {
      if (this.pageType === 'new') {
          this.createUnit(form);
      } else {
          this.updateUnit(form);
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
                name: 'Unit',
                isLink: true,
                link: '/inventory/unit/list'
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
