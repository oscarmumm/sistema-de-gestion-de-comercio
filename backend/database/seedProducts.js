import pool from '../db.js';

(async () => {
    try {
        await pool.query(
            `INSERT INTO products (
                category_id,
                brand_id,
                name,
                description,
                stock,
                unit_cost,
                sale_price,
                units_per_box
            ) VALUES
                (2, 1, 'Cuaderno A5 Rayado', 'Cuaderno tamaño A5 con hojas rayadas, tapa dura.', 50, 250.00, 400.00, 10),
                (2, 1, 'Cuaderno A4 Cuadriculado', 'Cuaderno tamaño A4 con hojas cuadriculadas, espiral metálico.', 30, 320.00, 500.00, 8),
                (1, 2, 'Lápiz HB', 'Lápiz grafito HB ideal para escritura y dibujo.', 100, 30.00, 60.00, 50),
                (1, 2, 'Lápiz 2B', 'Lápiz grafito 2B para trazos más oscuros.', 80, 35.00, 65.00, 50),
                (3, 3, 'Goma Blanca', 'Goma de borrar blanca, suave y sin residuos.', 60, 40.00, 70.00, 30),
                (3, 3, 'Goma de lápiz y tinta', 'Goma doble uso para lápiz y tinta.', 40, 55.00, 90.00, 20),
                (4, 4, 'Marcador Permanente Negro', 'Marcador indeleble punta fina.', 70, 80.00, 120.00, 12),
                (4, 4, 'Marcador Fluorescente Amarillo', 'Resaltador amarillo de alta visibilidad.', 90, 60.00, 100.00, 24),
                (5, 5, 'Carpeta A4 con broche', 'Carpeta plástica con broche metálico.', 25, 150.00, 250.00, 6),
                (5, 5, 'Carpeta con anillos', 'Carpeta con anillos para hojas perforadas.', 20, 180.00, 280.00, 4),
                (6, 6, 'Pegamento en barra', 'Pegamento sólido para papel y cartón.', 60, 70.00, 110.00, 20),
                (6, 6, 'Cola vinílica 250ml', 'Adhesivo líquido multiuso.', 40, 90.00, 140.00, 12),
                (7, 10, 'Tijera escolar 13cm', 'Tijera con punta redonda para uso escolar.', 35, 120.00, 180.00, 10),
                (7, 10, 'Tijera metálica 18cm', 'Tijera profesional de acero inoxidable.', 20, 200.00, 300.00, 6),
                (8, 8, 'Regla plástica 30cm', 'Regla transparente con medidas en cm.', 50, 60.00, 100.00, 20),
                (8, 8, 'Regla metálica 20cm', 'Regla de acero para trazos precisos.', 30, 90.00, 150.00, 10),
                (9, 9, 'Mochila escolar básica', 'Mochila con dos compartimentos y tiras acolchadas.', 15, 1200.00, 1800.00, 2),
                (9, 9, 'Mochila con ruedas', 'Mochila reforzada con ruedas y manija extensible.', 10, 1800.00, 2500.00, 1);`
        );
    } catch (error) {
        console.log(error);
    }
})();
