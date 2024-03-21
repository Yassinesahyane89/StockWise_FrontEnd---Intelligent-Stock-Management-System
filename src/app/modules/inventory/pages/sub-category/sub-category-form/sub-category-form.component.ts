import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {SubCategoryRequest} from "app/shared/models/request/sub-category-request.model";

import {ToastrService} from "ngx-toastr";
import {SubCategoryService} from "app/core/services/sub-category/sub-category.service";
import {CategoryService} from "app/core/services/category/category.service";
import {CategoryRequest} from "../../../../../shared/models/request/category-request.model";

@Component({
      selector: 'app-sub-category-form',
      templateUrl: './sub-category-form.component.html',
      styleUrls: ['./sub-category-form.component.scss'],
      encapsulation: ViewEncapsulation.None
})
export class SubCategoryFormComponent implements OnInit {
    //public
    public subCategoryReq: any = {} as SubCategoryRequest;
    public pageType: string;
    public pageTitle: string;
    public subCategoryID: number;
    public contentHeader: object;
    public categories: any;
    public selectedCategory: any;

    constructor(
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private router: Router,
        private subCategoryService: SubCategoryService,
        private categoryService: CategoryService
    ) { }

    // handle success case
    handleSuccess(response,form) {
        // redirect to category list /inventory/category/list
        this.router.navigate(['/inventory/sub-category/list']);

        // show toast
        this.toastr.success(response.message, 'Progress Bar', {
            progressBar: true,
            toastClass: 'toast ngx-toastr',
            closeButton: true
        });

        //form.reset();
        form.reset();
        this.subCategoryReq = {} as SubCategoryRequest;
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

    // create sub-category
    createSubCategory(form) {
        this.subCategoryService.createSubCategory(this.subCategoryReq).subscribe((response: any) => {
            this.handleSuccess(response,form);
        }, (error) => {
            this.handleError(error,form);
        });
    }

    // update sub-category
    updateSubCategory(form) {
        this.subCategoryService.updateSubCategory(this.subCategoryID, this.subCategoryReq).subscribe((response: any) => {
            this.handleSuccess(response,form);
        }, (error) => {
            this.handleError(error,form);
        });
    }

    // get sub-category by id
    getSubCategoryById() {
        this.subCategoryService.getSubCategoryById(this.subCategoryID).subscribe((response: any) => {
            this.subCategoryReq = response.data;
        }, (error) => {
            this.handleError(error,null);
        });
    }

    // get all categories
    getCategories() {
        this.categoryService.getCategories().subscribe((response: any) => {
            // create a category list for select dropdown
            this.categories = response.data.map((item) => {
                return {
                    id: item.id,
                    name: item.categoryName,
                    value: item.id
                };
            });
        }, (error) => {
            this.handleError(error,null);
        });
    }

    // check page type
    checkPageType() {
        if (window.location.href.indexOf('new-sub-category') > -1) {
            this.pageType = 'new';
            this.pageTitle = 'Add New Sub Category';
            this.getCategories();
        }else{
            this.pageType = 'edit';
            this.pageTitle = 'Edit Sub Category';
            this.subCategoryID = this.route.snapshot.params.id;
            this.getSubCategoryById();
            this.getCategories();
        }
    }

    // submit sub-category
    submitSubCategory(form) {
        if (this.pageType === 'new') {
            this.subCategoryReq.parentCategoryId = this.selectedCategory.value;
            this.createSubCategory(form);
        } else {
            this.subCategoryReq.parentCategoryId = this.selectedCategory.value;
            this.updateSubCategory(form);
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
                        name: 'Sub Category',
                        isLink: true,
                        link: '/inventory/sub-category/list'
                    },
                    {
                        name: this.pageTitle,
                        isLink: false
                    }
                ]
            }
        };
    }

    getSubCategoryf($event: any) {
        console.log("$event");
    }
}
