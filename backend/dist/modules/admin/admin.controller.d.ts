import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getCustomers(): Promise<{
        id: number;
        fullName: string;
        email: string;
        role: import("../auth/entities/customer.entity").CustomerRole;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
