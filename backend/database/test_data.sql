-- INSERTS
INSERT INTO
    roles (role_name)
VALUES
    ('admin'),
    ('vendedor');

SELECT * FROM roles;

INSERT INTO
    users (role_id, name, surname, username, password)
VALUES
    (
        1,
        'Carlos',
        'Garcia',
        'carlosgarcia123',
        'influencia'
    ),
    (
        2,
        'Gustavo',
        'Cerati',
        'gustavocerati456',
        'musicaligera'
    );

SELECT * FROM users;

INSERT INTO
    categories (name)
VALUES
    ('lapiceras'),
    ('lácpices');

SELECT * FROM categories;

INSERT INTO
    brands (name)
VALUES
    ('Bic'),
    ('Pelikan');

SELECT * FROM brands;

INSERT INTO
    products (
        category_id,
        brand_id,
        name,
        description,
        stock,
        unit_cost,
        sale_price,
        units_per_box
    )
VALUES
    (
        1,
        1,
        'Lapicera clásica',
        'Lapicera azul clasica',
        0,
        1,
        4,
        20
    ),
    (
        1,
        1,
        'Lapicera trazo fino',
        'Lapicera azul trazo fino',
        0,
        1.2,
        4.8,
        20
    );

SELECT * FROM products;

INSERT INTO
    payment_methods (name)
VALUES
    ('Efectivo'),
    ('Visa Débito');

SELECT * FROM payment_methods;

INSERT INTO
    suppliers (name)
VALUES
    ('Mayorista SRL'),
    ('Super Mayorista');

SELECT * FROM suppliers;

INSERT INTO
    product_entries_header (user_id, supplier_id)
VALUES
    (2, 1),
    (2, 2);

SELECT * FROM product_entries_header;

INSERT INTO
    product_entries_items (product_id, entry_id, boxes)
VALUES
    (1, 1, 3),
    (2, 2, 2);

SELECT * FROM product_entries_items;

INSERT INTO
    sales (user_id, total, customer, payment_method_id)
VALUES
    (2, 16, '...', 1);

SELECT * FROM sales;

INSERT INTO
    sale_items (
        sale_id,
        product_id,
        quantity,
        discount,
        price_type
    )
VALUES
    (1, 1, 4, 0, ''),
    (1, 2, 4, 0, '');

SELECT * FROM sale_items;

ROLLBACK;