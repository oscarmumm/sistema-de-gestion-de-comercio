CREATE DATABASE store_management;

\c store_management;

CREATE TABLE roles (
        role_id SERIAL PRIMARY KEY,
        role_name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        role_id INT REFERENCES roles(role_id),
        name VARCHAR(100) NOT NULL,
        surname VARCHAR(100) NOT NULL,
        username VARCHAR(50) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE categories (
        category_id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL
);

CREATE TABLE brands (
        brand_id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL
);

CREATE TABLE products (
        product_id SERIAL PRIMARY KEY,
        category_id INT NOT NULL REFERENCES categories(category_id),
        brand_id INT NOT NULL REFERENCES brands(brand_id),
        name VARCHAR(100) NOT NULL,
        description VARCHAR(1000),
        stock INT NOT NULL,
        unit_cost NUMERIC(10,2) NOT NULL,
        sale_price NUMERIC (10, 2) NOT NULL,
        units_per_box INT NOT NULL
);

CREATE TABLE product_entries_header (
        entry_id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(user_id) NOT NULL,
        supplier VARCHAR(100) NOT NULL,
        entry_date TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE product_entries_items (
        id SERIAL PRIMARY KEY,
        product_id INT NOT NULL REFERENCES products(product_id),
        entry_id INT NOT NULL REFERENCES product_entries_header(entry_id) ON DELETE CASCADE,
        boxes INT NOT NULL,
        units_added INT NOT NULL
);

CREATE TABLE payment_methods (
        payment_method_id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL
);

CREATE TABLE sales (
        sale_id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(user_id) NOT NULL,
        total NUMERIC(10,2) NOT NULL,
        customer VARCHAR(150),
        payment_method_id INT NOT NULL REFERENCES payment_methods(payment_method_id),
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE sale_items (
        id SERIAL PRIMARY KEY,
        sale_id INT NOT NULL REFERENCES sales(sale_id) ON DELETE CASCADE,
        product_id INT NOT NULL REFERENCES products(product_id),
        quantity INT NOT NULL CHECK (quantity > 0),
        discount NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (discount >= 0),
        price_type VARCHAR(20) 
);

CREATE OR REPLACE FUNCTION update_stock_on_sale()
RETURNS TRIGGER AS $$
BEGIN
        UPDATE products
        SET stock = stock - NEW.quantity
        WHERE porduct_id = NEW.porduct_id;
        RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER discount_stock_sale
AFTER INSERT ON sale_items
FOR EACH ROW
EXECUTE FUNCTION update_stock_on_sale();