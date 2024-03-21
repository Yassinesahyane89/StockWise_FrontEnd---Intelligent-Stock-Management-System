import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FlatpickrOptions } from 'ng2-flatpickr';
@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.scss']
})
export class AccountSettingComponent implements OnInit, OnDestroy {
    // public
    public contentHeader: object;
    public data: any;
    public birthDateOptions: FlatpickrOptions = {
      altInput: true
    };
    public passwordTextTypeOld = false;
    public passwordTextTypeNew = false;
    public passwordTextTypeRetype = false;
    public avatarImage: string;

    // Constructor
    constructor() {}

    // Toggle Password Text Type Old
    togglePasswordTextTypeOld() {
      this.passwordTextTypeOld = !this.passwordTextTypeOld;
    }

    // Toggle Password Text Type New
    togglePasswordTextTypeNew() {
      this.passwordTextTypeNew = !this.passwordTextTypeNew;
    }

    // Toggle Password Text Type Retype
    togglePasswordTextTypeRetype() {
      this.passwordTextTypeRetype = !this.passwordTextTypeRetype;
    }

    /**
     * Upload Image
     *
     * @param event
     */
    uploadImage(event: any) {
      if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();

        reader.onload = (event: any) => {
          this.avatarImage = event.target.result;
        };

        reader.readAsDataURL(event.target.files[0]);
      }
    }

    // On init
    ngOnInit() {
        // fake data
        this.data = {
            accountSetting: {
                general: {
                    username: 'admin',
                    fullName: 'John Doe',
                    email: 'john@gmail.com',
                    company: 'Flatlogic',
                },
                info: {
                    bio: 'I am a web developer',
                    dob: '1995-01-24',
                    phone: '+1-202-555-0170',
                    address: 'USA',
                    country: 'United States',
                    website: 'www.flatlogic.com',
                    city: 'San Francisco',
                    zip: '94108',
                },
                social: {
                    socialLinks: {
                        linkedin: 'https://linkedin.com',
                        facebook: 'https://facebook.com',
                        twitter: 'https://twitter.com',
                        instagram: 'https://instagram.com',
                        google: 'https://google.com',
                        quora: 'https://quora.com',
                    },
                },
            }
        }

      // content header
      this.contentHeader = {
        headerTitle: 'Account Settings',
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
              name: 'Pages',
              isLink: true,
              link: '/'
            },
            {
              name: 'Account Settings',
              isLink: false
            }
          ]
        }
      };
    }

    // On destroy
    ngOnDestroy(): void {}
}