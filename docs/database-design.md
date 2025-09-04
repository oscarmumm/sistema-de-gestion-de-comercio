El diseño de la base de datos y del diagrama entidad relación se realizó utilizando la web dbdiagram.io, la cual permite visualizar el diagrama al mismo tiempo que se van diseñando las tablas con sus respectivos datos.

Utilizamos la siguiente información:

- categories: categorías de productos
- products: productos
- product_entries_header: datos de ingreso de una entrega de mercadería por parte de un proveedor
- product_entries_items: detalle de los items recibidos en un determinado despacho de un proveedor
- payment_methods: métodos de pago aceptados para venta al público
- sales: ventas
- sale_items: detalle de los items de la venta realizada


```
Table roles {
  role_id int [pk, increment]
  role_name varchar(50) [unique, not null]
  updated_at timestamp
  updated_by int
}

Table users {
  user_id int [pk, increment]
  role_id int [ref: > roles.role_id]
  name varchar(100) [not null]
  surname varchar(100) [not null]
  username varchar(50) [unique, not null]
  password text [not null]
  created_at timestamp
  updated_at timestamp
  updated_by int
}

Table categories {
  category_id int [pk, increment]
  name varchar(50) [unique, not null]
  updated_at timestamp
  updated_by int
}

Table brands {
  brand_id int [pk, increment]
  name varchar(50) [unique, not null]
  updated_at timestamp
  updated_by int
}

Table products {
  product_id int [pk, increment]
  category_id int [ref: > categories.category_id]
  brand_id int [ref: > brands.brand_id]
  name varchar(100) [not null]
  description varchar(1000)
  stock int [not null]
  unit_cost numeric(10,2) [not null]
  sale_price numeric(10,2) [not null]
  units_per_box int [not null]
  updated_at timestamp
  updated_by int
}

Table suppliers {
  supplier_id int [pk, increment]
  name varchar(100) [unique, not null]
  updated_at timestamp
  updated_by int
}

Table product_entries_header {
  entry_id int [pk, increment]
  user_id int [ref: > users.user_id]
  supplier int [ref: > suppliers.supplier_id]
  entry_date timestamp
}

Table product_entries_items {
  id int [pk, increment]
  product_id int [ref: > products.product_id]
  entry_id int [ref: > product_entries_header.entry_id]
  boxes int [not null]
}

Table payment_methods {
  payment_method_id int [pk, increment]
  name varchar(50) [unique, not null]
}

Table sales {
  sale_id int [pk, increment]
  user_id int [ref: > users.user_id]
  total numeric(10,2) [not null]
  customer varchar(150)
  payment_method_id int [ref: > payment_methods.payment_method_id]
  created_at timestamp
}

Table sale_items {
  id int [pk, increment]
  sale_id int [ref: > sales.sale_id]
  product_id int [ref: > products.product_id]
  quantity int [not null]
  discount numeric(10,2) [not null]
  price_type varchar(20)
}
```