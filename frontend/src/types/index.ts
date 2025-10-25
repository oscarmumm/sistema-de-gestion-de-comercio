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

export interface SaleItem {
    sale_id: number;
    product_id: number;
    quantity: number;
    discount: number;
    price_type: string;
}

export interface SaleItemView extends SaleItem {
    product_name: string;
    unit_price: number;
}

export interface Sale {
    user_id: number;
    total: number;
    customer: string;
    payment_method_id: number;
    created_at: Date;
    updated_at: Date;
    updated_by: number;
}

export interface StockEntry {
    user_id: number;
    supplier_id: number;
    entry_date: Date;
    created_at: Date;
    updated_at: Date;
    updated_by: number;
}

export interface StockEntryItem {
    entry_id: number;
    product_id: number;
    boxes: number;
}

export interface StockEntryItemView extends StockEntryItem {
    product_name: string;
    box_price: number;
}