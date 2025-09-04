-- INSERTS
INSERT INTO
    roles (name)
VALUES
    ('admin'),
    ('vendedor');

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

INSERT INTO
    categories (name)
VALUES
    ('lapiceras'),
    ('lácpices');

INSERT INTO
    brands (name)
VALUES
    ('Bic'),
    ('Pelikan');

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

INSERT INTO
    payment_methods (name)
VALUES
    ('Efectivo'),
    ('Visa Débito');

INSERT INTO
    product_entries_header (user_id, supplier)
VALUES
    (2, 'Mayorista SRL'),
    (2, 'Super Mayorista');

INSERT INTO
    product_entries_items (product_id, entry_id, boxes, units_added)
VALUES
    (1, 1, 3, 60),
    (2, 2, 2, 40);

INSERT INTO
    sales (user_id, total, customer, payment_method_id)
VALUES
    (2, 16, '...', 1);

INSERT INTO
    sale_items (
        sale_id,
        product_id,
        quantity,
        discount,
        price_type
    )
VALUES
    (1, 1, 4, 0,''),
    (1, 2, 4, 0,'');

ROLLBACK;