import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {CategoryService} from "app/core/services/category/category.service";
import {CategoryRequest} from "app/shared/models/request/category-request.model";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-category-form',
    templateUrl: './category-form.component.html',
    styleUrls: ['./category-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CategoryFormComponent implements OnInit {

    // public
    public categoryReq: CategoryRequest = {} as CategoryRequest;
    public pageType: string;
    public pageTitle: string;
    public categoryID: number;
    public contentHeader: object;

    constructor(
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private router: Router,
        private categoryService: CategoryService
    ) { }

    // handle success case
    handleSuccess(response,form) {
      // redirect to category list /inventory/category/list
      this.router.navigate(['/inventory/category/list']);

      // show toast
      this.toastr.success(response.message, 'Progress Bar', {
        progressBar: true,
        toastClass: 'toast ngx-toastr',
        closeButton: true
      });

      //form.reset();
      form.reset();
      this.categoryReq = {} as CategoryRequest;
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

    // add new category
    addCategory(form) {
        this.categoryService.createCategory(this.categoryReq).subscribe(
            (response) => {
                this.handleSuccess(response,form);
            },
            (error) => {
                this.handleError(error,form);
            }
        );
    }

    // update category
    updateCategory(form) {
        this.categoryService.updateCategory(this.categoryID, this.categoryReq).subscribe(
            (response) => {
                this.handleSuccess(response,form);
            },
            (error) => {
                this.handleError(error,form);
            }
        );
    }

    // get category by id
    getCategoryById() {
        this.categoryService.getCategoryById(this.categoryID).subscribe(
            (response:any) => {
                this.categoryReq = response.data;
            }
        );
    }

    // check page type
    checkPageType() {
      if (window.location.href.indexOf('new-category') > -1) {
        this.pageType = 'new';
        this.pageTitle = 'Add New Category';
      } else {
        this.categoryID = this.route.snapshot.params.id;
        this.pageType = 'edit';
        this.pageTitle = 'Edit Category';

        this.getCategoryById();
      }
    }

    // submit category form
    categoryFomrSubmitted(form) {
        if (this.pageType === 'new') {
          this.addCategory(form);
        } else {
          this.updateCategory(form);
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
                        name: 'Categories',
                        isLink: true,
                        link: '/inventory/category/list'
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
