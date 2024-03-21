import { CoreMenu } from '@core/types'

export const menu: CoreMenu[] = [
  {
    id: 'home',
    title: 'Home',
    translate: 'MENU.HOME',
    type: 'item',
    icon: 'home',
    url: 'home'
  },
  {
    id: 'sample',
    title: 'Sample',
    translate: 'MENU.SAMPLE',
    type: 'item',
    icon: 'file',
    url: 'sample'
  },
  {
    id: 'user management',
    title: 'User Management',
    translate: 'MENU.USER_MANAGEMENT',
    type: 'section',
    icon: 'package',
    children: [
      {
        id: 'users',
        title: 'Users',
        translate: 'MENU.USER_MANAGEMENT.USERS.COLLAPSIBLE',
        type: 'collapsible',
        icon: 'user-check',
        children: [
          {
            id: 'list',
            title: 'List Users',
            translate: 'MENU.USER_MANAGEMENT.USERS.LIST',
            type: 'item',
            icon: 'circle',
            url: 'user-management/users/list'
          },
          {
            id: 'add',
            title: 'Add Users',
            translate: 'MENU.USER_MANAGEMENT.USERS.ADD',
            type: 'item',
            icon: 'circle',
            url: 'user-management/users/new-user'
          }
        ]
      },
      {
        id: 'roles & permissions',
        title: 'Roles & Permissions',
        translate: 'MENU.USER_MANAGEMENT.ROLES_PERMISSIONS.COLLAPSIBLE',
        type: 'collapsible',
        icon: 'shield',
        children: [
          {
            id: 'list',
            title: 'List Roles & Permissions',
            translate: 'MENU.USER_MANAGEMENT.ROLES_PERMISSIONS.LIST',
            type: 'item',
            icon: 'circle',
            url: 'user-management/roles/list'
          },
          {
            id: 'add',
            title: 'Add Roles',
            translate: 'MENU.USER_MANAGEMENT.ROLES_PERMISSIONS.ADD',
            type: 'item',
            icon: 'circle',
            url: 'user-management/roles/new-role'
          }
        ]
      }
    ]
  },
  {
    id: 'inventory',
    type: 'section',
    title: 'Inventory',
    translate: 'MENU.INVENTORY.SECTION',
    children: [
      {
        id: 'products',
        title: 'Products',
        translate: 'MENU.INVENTORY.PRODUCTS.COLLAPSIBLE',
        type: 'collapsible',
        icon: 'box',
        children: [
          {
            id: 'list',
            title: 'List Products',
            translate: 'MENU.INVENTORY.PRODUCTS.LIST',
            type: 'item',
            icon: 'circle',
            url: 'inventory/product/list'
          },
          {
            id: 'add',
            title: 'Add Product',
            translate: 'MENU.INVENTORY.PRODUCTS.ADD',
            type: 'item',
            icon: 'circle',
            url: 'inventory/product/new-product'
          }
        ]
      },
      // {
      //   id: 'Expired Products',
      //   title: 'Expired Products',
      //   translate: 'MENU.INVENTORY.EXPIRED',
      //   type: 'item',
      //   icon: 'codesandbox',
      //   url: 'inventory/expired-products'
      // },
      // {
      //   id: 'low stock',
      //   title: 'Low Stock',
      //   translate: 'MENU.INVENTORY.LOW_STOCK',
      //   type: 'item',
      //   icon: 'trending-down',
      //   url: 'inventory/low-stock'
      // },
      {
        id: 'categories',
        title: 'Categories',
        translate: 'MENU.INVENTORY.CATEGORIES.COLLAPSIBLE',
        type: 'collapsible',
        icon: 'codepen',
        children: [
          {
            id: 'list',
            title: 'List Categories',
            translate: 'MENU.INVENTORY.CATEGORIES.LIST',
            type: 'item',
            icon: 'circle',
            url: 'inventory/category/list'
          },
          {
            id: 'add',
            title: 'Add Category',
            translate: 'MENU.INVENTORY.CATEGORIES.ADD',
            type: 'item',
            icon: 'circle',
            url: 'inventory/category/new-category'
          }
        ]
      },
      {
        id: 'sub categories',
        title: 'Sub Categories',
        translate: 'MENU.INVENTORY.SUBCATEGORIES.COLLAPSIBLE',
        type: 'collapsible',
        icon: 'package',
        children: [
          {
            id: 'list',
            title: 'List Sub Categories',
            translate: 'MENU.INVENTORY.SUBCATEGORIES.LIST',
            type: 'item',
            icon: 'circle',
            url: 'inventory/sub-category/list'
          },
          {
            id: 'add',
            title: 'Add Sub Category',
            translate: 'MENU.INVENTORY.SUBCATEGORIES.ADD',
            type: 'item',
            icon: 'circle',
            url: 'inventory/sub-category/new-sub-category'
          }
        ]
      },
      {
        id: 'brands',
        title: 'Brands',
        translate: 'MENU.INVENTORY.BRANDS.COLLAPSIBLE',
        type: 'collapsible',
        icon: 'tag',
        children: [
          {
            id: 'list',
            title: 'List Brands',
            translate: 'MENU.INVENTORY.BRANDS.LIST',
            type: 'item',
            icon: 'circle',
            url: 'inventory/brand/list'
          },
          {
            id: 'add',
            title: 'Add Brand',
            translate: 'MENU.INVENTORY.BRANDS.ADD',
            type: 'item',
            icon: 'circle',
            url: 'inventory/brand/new-brand'
          }
        ]
      },
      {
        id: 'units',
        title: 'Units',
        translate: 'MENU.INVENTORY.UNITS.COLLAPSIBLE',
        type: 'collapsible',
        icon: 'speaker',
        children: [
          {
            id: 'list',
            title: 'List Units',
            translate: 'MENU.INVENTORY.UNITS.LIST',
            type: 'item',
            icon: 'circle',
            url: 'inventory/unit/list'
          },
          {
            id: 'add',
            title: 'Add Unit',
            translate: 'MENU.INVENTORY.UNITS.ADD',
            type: 'item',
            icon: 'circle',
            url: 'inventory/unit/new-unit'
          }
        ]
      },
      // {
      //   id: 'variant attributes',
      //   title: 'Variant Attributes',
      //   translate: 'MENU.INVENTORY.VARIANT_ATTRIBUTES.COLLAPSIBLE',
      //   type: 'collapsible',
      //   icon: 'layers',
      //   children: [
      //     {
      //       id: 'list',
      //       title: 'List Variant Attributes',
      //       translate: 'MENU.INVENTORY.VARIANT_ATTRIBUTES.LIST',
      //       type: 'item',
      //       icon: 'circle',
      //       url: 'inventory/variant-attributes'
      //     },
      //     {
      //       id: 'add',
      //       title: 'Add Variant Attribute',
      //       translate: 'MENU.INVENTORY.VARIANT_ATTRIBUTES.ADD',
      //       type: 'item',
      //       icon: 'circle',
      //       url: 'inventory/varient-attributes/new-variant-attribute'
      //     }
      //   ]
      // },
      {
        id: 'warranty',
        title: 'Warranty',
        translate: 'MENU.INVENTORY.WARRANTY.COLLAPSIBLE',
        type: 'collapsible',
        icon: 'bookmark',
        children: [
          {
            id: 'list',
            title: 'List Warranty',
            translate: 'MENU.INVENTORY.WARRANTY.LIST',
            type: 'item',
            icon: 'circle',
            url: 'inventory/warranty/list'
          },
          {
            id: 'add',
            title: 'Add Warranty',
            translate: 'MENU.INVENTORY.WARRANTY.ADD',
            type: 'item',
            icon: 'circle',
            url: 'inventory/warranty/new-warranty'
          }
        ]
      }
    ]
  },
]
