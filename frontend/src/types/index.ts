export interface Category {
    category_id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
    updated_by: number;
}

export interface LoggedUser {
    username: string;
}