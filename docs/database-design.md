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
Table categories {
  category_id int [pk, increment]
  name varchar(50) [not null]
}

Table products {
  product_id int [pk, increment]
  category_id int [not null, ref: > categories.category_id] 
  name varchar(100) [not null]
  description varchar(1000)
  stock int [not null]
  price_unit numeric(10,2) [not null]
  units_per_box int [not null]
}

Table product_entries_header {
  entry_id int [pk, increment]
  supplier varchar(100) [not null]
  entry_date timestamp [not null, default: 'now()']
}

Table product_entries_items {
  id int [pk, increment]
  product_id int [not null, ref: > products.product_id]
  entry_id int [not null, ref: > product_entries_header.entry_id]
  boxes int [not null]
  units_added int [not null]
}

Table payment_methods {
  payment_method_id int [pk, increment]
  name varchar(50) [not null]
}

Table sales {
  sale_id int [pk, increment]
  sale_date timestamp [not null, note: 'TIMESTAMP WITHOUT TIME ZONE', default: 'now()']
  total numeric(10, 2) [not null]
  customer varchar(150)
  payment_method_id int [not null, ref: > payment_methods.payment_method_id] 
  created_at timestamp [not null, default: 'now()']
}

Table sale_items {
  id int [pk, increment]
  sale_id int [not null, ref: > sales.sale_id]
  product_id int [not null, ref: > products.product_id]
  quantity int [not null]
  unit_price numeric(10, 2) [not null]
}
```