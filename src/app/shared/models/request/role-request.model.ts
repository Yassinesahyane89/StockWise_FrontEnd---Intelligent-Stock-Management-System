import {PermissionCategoryRequest} from "./permission-category-request.model";

export interface RoleRequest {
    id: number;
    roleName: string;
    permissions: PermissionCategoryRequest[];
}
