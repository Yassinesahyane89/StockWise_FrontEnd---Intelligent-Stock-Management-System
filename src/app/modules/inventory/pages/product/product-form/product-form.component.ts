import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {ProductRequest} from "app/shared/models/request/product-request.model";

import {ToastrService} from "ngx-toastr";
import {ProductService} from "app/core/services/product/product.service";
import {CategoryService} from "../../../../../core/services/category/category.service";
import {BrandService} from "../../../../../core/services/brand/brand.service";
import {SubCategoryService} from "../../../../../core/services/sub-category/sub-category.service";
import {UnitService} from "../../../../../core/services/unit/unit.service";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProductFormComponent implements OnInit {
    //public
    public productReq: any = {} as ProductRequest;
    public pageType: string;
    public pageTitle: string;
    public productID: number;
    public contentHeader: object;
    public categories: any;
    public selectedCategory: any;
    public subCategories: any;
    public selectedSubCategory: any;
    public brands: any;
    public selectedBrand: any;
    public units: any;
    public selectedUnit: any;
    constructor(
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private router: Router,
        private productService: ProductService,
        private categoryService: CategoryService,
        private subCategoryService: SubCategoryService,
        private brandService: BrandService,
        private unitService: UnitService
    ) { }

    // handle success case
    handleSuccess(response,form) {
      // redirect to product list /inventory/product/list
      this.router.navigate(['/inventory/product/list']);

      // show toast
      this.toastr.success(response.message, 'Progress Bar', {
        progressBar: true,
        toastClass: 'toast ngx-toastr',
        closeButton: true
      });

      //form.reset();
      form.reset();
      this.productReq = {} as ProductRequest;
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

    // create product
    createProduct(form) {
      console.log(this.productReq);
      this.productService.createProduct(this.productReq).subscribe((response: any) => {
        this.handleSuccess(response,form);
      }, (error) => {
        this.handleError(error,form);
      });
    }

    // update product
    updateProduct(form) {
      this.productService.updateProduct(this.productID, this.productReq).subscribe((response: any) => {
        this.handleSuccess(response,form);
      }, (error) => {
        this.handleError(error,form);
      });
    }

    // get product by id
    getProductByID() {
      this.productService.getProductById(this.productID).subscribe((response: any) => {
        this.productReq.name = response.data.name;
        // the price are in string format like this "$ 100.00" so we need to remove the "$" and convert it to number
        this.productReq.price = response.data.price.replace('$ ', '');
        this.productReq.quantity = response.data.quantity;
        this.productReq.description = response.data.description;
        this.productReq.categoryId = response.data.categoryId;
        this.productReq.subCategoryId = response.data.subCategoryId;
        this.productReq.brandId = response.data.brandId;
        this.productReq.unitId = response.data.unitId;
        this.productReq.status = response.data.status;

        this.getCategoryByID();
        this.getSubCategoryByID();
        this.getBrandByID();
        this.getUnitByID();
      });
    }

    // get all categories
    getAllCategories() {
      this.categoryService.getCategories().subscribe((response: any) => {
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

    // get sub-category by category id
    getSubCategory() {
        console.log("$event");
        this.subCategoryService.getSubCategoryByCategoryId(this.selectedCategory.id).subscribe((response: any) => {
            this.subCategories = response.data.map((item) => {
                return {
                    id: item.id,
                    name: item.categoryName,
                    value: item.id
                };
            });
        }, (error) => {
            this.handleError(error, null);
        });
    }

    // get all brands
    getAllBrands() {
        this.brandService.getBrands().subscribe((response: any) => {
            this.brands = response.data.map((item) => {
                return {
                    id: item.id,
                    name: item.brand,
                    value: item.id
                };
            });
        }, (error) => {
            this.handleError(error, null);
        });
    }

    // get all units
    getAllUnits() {
        this.unitService.getAllUnits().subscribe((response: any) => {
            this.units = response.data.map((item) => {
                return {
                    id: item.id,
                    name: item.unitName,
                    value: item.id
                };
            });
        }, (error) => {
            this.handleError(error, null);
        });
    }

    // get brand by id
    getBrandByID() {
        this.brandService.getBrandById(this.productReq.brandId).subscribe((response: any) => {
            this.selectedBrand = {
                id: response.data.id,
                name: response.data.brand,
                value: response.data.id
            };
        }, (error) => {
            this.handleError(error, null);
        });
    }

    // get sub-category by id
    getSubCategoryByID() {
        this.subCategoryService.getSubCategoryById(this.productReq.subCategoryId).subscribe((response: any) => {
            this.selectedSubCategory = {
                id: response.data.id,
                name: response.data.categoryName,
                value: response.data.id
            };
        }, (error) => {
            this.handleError(error, null);
        });
    }

    // get category by id
    getCategoryByID() {
        this.categoryService.getCategoryById(this.productReq.categoryId).subscribe((response: any) => {
            this.selectedCategory = {
                id: response.data.id,
                name: response.data.categoryName,
                value: response.data.id
            };
        }, (error) => {
            this.handleError(error, null);
        });
    }

    // get unit by id
    getUnitByID() {
        this.unitService.getUnitById(this.productReq.unitId).subscribe((response: any) => {
            this.selectedUnit = {
                id: response.data.id,
                name: response.data.unitName,
                value: response.data.id
            };
        }, (error) => {
            this.handleError(error, null);
        });
    }

    // check page type
    checkPageType() {
        if (window.location.href.indexOf('new-product') > -1) {
            this.pageType = 'new';
            this.pageTitle = 'Add New Product';
        }else{
            this.pageType = 'edit';
            this.pageTitle = 'Edit Product';
            this.productID = this.route.snapshot.params.id;
            this.getProductByID();
        }
    }

    // submit product
    productFomrSubmitted(form) {
        this.productReq.subCategoryId = this.selectedSubCategory.id;
        this.productReq.brandId = this.selectedBrand.id;
        this.productReq.unitId = this.selectedUnit.id;
        if (this.pageType === 'new') {
            this.createProduct(form);
        }else {
            this.updateProduct(form);
        }
    }

    ngOnInit(): void {
        // check page type
        this.checkPageType();

        // get all categories
        this.getAllCategories();

        // get all brands
        this.getAllBrands();

        // get all units
        this.getAllUnits();

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
                        name: 'Product',
                        isLink: true,
                        link: '/inventory/product/list'
                    },
                    {
                        name: this.pageTitle,
                        isLink: false
                    }
                ]
            }
        }
    }
}
