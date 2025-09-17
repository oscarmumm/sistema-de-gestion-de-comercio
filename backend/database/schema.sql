CREATE DATABASE store_management;

\c store_management;

------------------------------
-- TABLES
------------------------------
CREATE TABLE roles (
        role_id SERIAL PRIMARY KEY,
        name VARCHAR(50) UNIQUE NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        role_id INT REFERENCES roles(role_id),
        name VARCHAR(100) NOT NULL,
        surname VARCHAR(100) NOT NULL,
        username VARCHAR(50) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP
);

ALTER TABLE roles ADD COLUMN updated_by INT REFERENCES users(user_id);
ALTER TABLE users ADD COLUMN updated_by INT REFERENCES users(user_id);

CREATE TABLE categories (
        category_id SERIAL PRIMARY KEY,
        name VARCHAR(50) UNIQUE NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW(),
        updated_by INT REFERENCES users(user_id)
);

CREATE TABLE brands (
        brand_id SERIAL PRIMARY KEY,
        name VARCHAR(50) UNIQUE NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW(),
        updated_by INT REFERENCES users(user_id)
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
        units_per_box INT NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW(),
        updated_by INT REFERENCES users(user_id)
);

CREATE TABLE suppliers (
        supplier_id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW(),
        updated_by INT REFERENCES users(user_id)
);

CREATE TABLE product_entries_header (
        entry_id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(user_id) NOT NULL,
        supplier_id INT NOT NULL REFERENCES suppliers(supplier_id),
        entry_date TIMESTAMP NOT NULL DEFAULT NOW()
);

-- This table stores the products and quantities in each inventory entry
CREATE TABLE product_entries_items (
        id SERIAL PRIMARY KEY,
        product_id INT NOT NULL REFERENCES products(product_id),
        entry_id INT NOT NULL REFERENCES product_entries_header(entry_id) ON DELETE CASCADE,
        boxes INT NOT NULL
);

CREATE TABLE payment_methods (
        payment_method_id SERIAL PRIMARY KEY,
        name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE sales (
        sale_id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(user_id) NOT NULL,
        total NUMERIC(10,2) NOT NULL,
        customer VARCHAR(150),
        payment_method_id INT NOT NULL REFERENCES payment_methods(payment_method_id),
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- This table stores the products, quantities, and discounts for each sale tansaction
CREATE TABLE sale_items (
        id SERIAL PRIMARY KEY,
        sale_id INT NOT NULL REFERENCES sales(sale_id) ON DELETE CASCADE,
        product_id INT NOT NULL REFERENCES products(product_id),
        quantity INT NOT NULL CHECK (quantity > 0),
        discount NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (discount >= 0),
        price_type VARCHAR(20) 
);

----------------------------
-- FUNCTIONS
----------------------------

-- Function to update stock on sales
CREATE OR REPLACE FUNCTION update_stock_on_sale()
RETURNS TRIGGER AS $$
DECLARE
        current_stock INT;
BEGIN
        SELECT stock INTO current_stock
        FROM products
        WHERE product_id = NEW.product_id;

        IF current_stock < NEW.quantity THEN
                RAISE EXCEPTION 'Stock insuficiente para el producto %: disponible %, solicitado %',
                        NEW.product_id, current_stock, NEW.quantity;
        END IF;

        UPDATE products
        SET stock = stock - NEW.quantity
        WHERE product_id = NEW.product_id;

        RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to update stock on entries
CREATE OR REPLACE FUNCTION update_stock_on_entry()
RETURNS TRIGGER AS $$
DECLARE
        v_units_per_box INT;
BEGIN
        SELECT units_per_box INTO v_units_per_box
        FROM products
        WHERE product_id = NEW.product_id;

        IF v_units_per_box IS NULL THEN
                RAISE EXCEPTION 'Producto % no tiene definido units_per_box', NEW.product_id;
        END IF;

        UPDATE products
        SET stock = stock + (NEW.boxes * v_units_per_box)
        WHERE product_id = NEW.product_id;

        RETURN NEW;
END;
$$ LANGUAGE plpgsql;

----------------------------
-- TRIGGERS
----------------------------

-- Triggers to update stock on sales
CREATE TRIGGER discount_stock_sale
AFTER INSERT ON sale_items
FOR EACH ROW
EXECUTE FUNCTION update_stock_on_sale();

-- Trigger to update stock on entries
CREATE TRIGGER add_stock_on_entry
AFTER INSERT ON product_entries_items
FOR EACH ROW
EXECUTE FUNCTION update_stock_on_entry();

----------------------------
-- INDEXES
----------------------------
CREATE INDEX idx_roles_name ON roles(role_name);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_products_name ON products(name);
CREATE INDEX idx_categories_name ON categories(name);
CREATE INDEX idx_brands_name ON brands(name);
CREATE INDEX idx_payment_methods_name ON payment_methods(name);
CREATE INDEX idx_product_entries_header_entry_date ON product_entries_header(entry_date);
CREATE INDEX idx_sales_created_at ON sales(created_at);