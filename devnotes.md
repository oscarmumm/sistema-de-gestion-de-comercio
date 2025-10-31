TODO

- Agregar validaciones o mejorar las existentes en las funciones de update de los modelos. Considerar utilizar funciones utilitarias. (./utils)?
- Agregar paginación a las llamadas GET ALL, de modo que podamos onbtener una mejor performance
- Agregar funciones de getByName a las principales tablas

- EL ERROR AL EDITAR CATEGORIA ESTÁ EN QUE ESTOY PASANDO EL PARÁMETRO UPDATED_BY COMO UN STRING EN LUGAR DE UTILIZAR EL ID DEL USUARIO

DB CREATION:

DESKTOP
\i 'C:/Users/oscar/workspace/sistema-de-gestion-de-comercio/backend/database/schema.sql'

LAPTOP
\i 'C:/workspace/sistema-de-gestion-de-comercio/backend/database/schema.sql'

TEST QUERY

SELECT categories.name, SUM(total) as total
FROM sales
JOIN sale_items ON sales.sale_id = sale_items.sale_id
JOIN products ON sale_items.product_id = products.product_id
JOIN categories ON categories.category_id = products.category_id
WHERE sales.created_at BETWEEN '2025-09-01T00:00:00' AND '2025-09-30T23:59:59'
GROUP BY categories.name;