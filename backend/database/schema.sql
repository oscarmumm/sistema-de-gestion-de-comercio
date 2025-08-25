-- 💡 AGREGAR EL ON DELETE CASCADE EN LOS ÍTEMS QUE CONSIDEREMOS NECESARIOS

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
        username VARCHAR(50) NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE categories (
        category_id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL
);

CREATE TABLE products (
        product_id SERIAL PRIMARY KEY,
        category_id INT NOT NULL REFERENCES categories(category_id),
        name VARCHAR(100) NOT NULL,
        description VARCHAR(1000),
        stock INT NOT NULL,
        price_unit NUMERIC(10,2) NOT NULL,
        units_per_box INT NOT NULL
);

CREATE TABLE product_entries_header (
        entry_id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(user_id) NOT NULL
        supplier VARCHAR(100) NOT NULL,
        entry_date TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE product_entries_items (
        id SERIAL PRIMARY KEY,
        product_id INT NOT NULL REFERENCES products(product_id),
        entry_id INT NOT NULL REFERENCES product_entries_header(entry_id),
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
        sale_date TIMESTAMP NOT NULL DEFAULT NOW(),
        total NUMERIC(10,2) NOT NULL,
        customer VARCHAR(150),
        payment_method_id INT NOT NULL REFERENCES payment_methods(payment_method_id),
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE sale_items (
        id SERIAL PRIMARY KEY,
        sale_id INT NOT NULL REFERENCES sales(sale_id),
        product_id INT NOT NULL REFERENCES products(product_id),
        quantity INT NOT NULL,
        unit_price NUMERIC(10, 2) NOT NULL
);