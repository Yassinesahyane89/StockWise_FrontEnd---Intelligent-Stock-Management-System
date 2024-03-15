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
            url: 'user-management/roles'
          },
          {
            id: 'add',
            title: 'Add Roles & Permissions',
            translate: 'MENU.USER_MANAGEMENT.ROLES_PERMISSIONS.ADD',
            type: 'item',
            icon: 'circle',
            url: 'user-management/new-role'
          }
        ]
      }
    ]
  },
]
