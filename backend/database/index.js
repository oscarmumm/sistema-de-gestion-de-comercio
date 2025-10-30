import pool from '../db.js';
import { seedRoles } from './seedRoles.js';
import { seedUsers } from './seedUsers.js';
import { seedCategories } from './seedCategories.js';
import { seedBrands } from './seedBrands.js';
import { seedPaymentMethods } from './seedPaymentMethods.js';
import { seedProducts } from './seedProducts.js';
import { seedSales } from './seedSales.js';
import { seedSaleItems } from './seedSaleItems.js';
import { seedSuppliers } from './seedSuppliers.js';

(async () => {
    try {
        console.log('Seed process starting...');

        await seedRoles();
        console.log('Seed Roles OK');

        await seedUsers();
        console.log('Seed Users OK');

        await seedCategories();
        console.log('Seed Categories OK');

        await seedBrands();
        console.log('Seed Brands OK');

        await seedPaymentMethods();
        console.log('Seed Payment Methods OK');

        await seedProducts();
        console.log('Seed Products OK');

        await seedSuppliers();
        console.log('Seed Suppliers OK');

        await seedSales();
        console.log('Seed Sales OK');

        await seedSaleItems();
        console.log('Seed Sale Items OK');
    } catch (error) {
        console.error('Seed process error: ', error);
    } finally {
        await pool.end();
    }
})();
