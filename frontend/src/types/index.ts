export interface Role {
    role_id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
    updated_by: number;
}

export interface User {
    user_id: number;
    role_id: number;
    name: string;
    surname: string;
    username: string;
    password: string;
    created_at: Date;
    updated_at: Date;
    updated_by: number;
}

export interface Category {
    category_id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
    updated_by: number;
}

export interface Brand {
    brand_id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
    updated_by: number;
}

export interface Supplier {
    supplier_id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
    updated_by: number;
}

export interface PaymentMethod {
    payment_method_id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
    updated_by: number;
}

export interface Product {
    product_id: number;
    category_id: number;
    brand_id: number;
    name: string;
    description: string;
    stock: number;
    unit_cost: number;
    sale_price: number;
    units_per_box: number;
    created_at: Date;
    updated_at: Date;
    updated_by: number;
}
