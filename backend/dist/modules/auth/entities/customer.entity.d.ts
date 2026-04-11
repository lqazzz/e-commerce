export type CustomerRole = 'customer' | 'admin';
export declare class Customer {
    id: number;
    email: string;
    fullName: string;
    passwordHash: string;
    role: CustomerRole;
    createdAt: Date;
    updatedAt: Date;
}
