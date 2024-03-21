import {PermissionRequest} from "./permission-request.model";

export interface PermissionCategoryRequest {
    permissionCategory: string;
    values: PermissionRequest[];
}
