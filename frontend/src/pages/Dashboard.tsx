import { CurrenttMonthSales } from '../components/charts/CurrentMonthSales';
import { CurrentWeekSales } from '../components/charts/CurrentWeekSales';
import { LastMonthSales } from '../components/charts/LastMonthSales';
import { LastWeekSales } from '../components/charts/LastWeekSales';

export const Dashboard = () => {
    return (
        <div className="min-h-12 min-w-12">
            <h2 className="text-center text-2xl font-semibold mb-5">Ventas</h2>
            <div className="flex flex-col">
                <div className="flex">
                    <CurrentWeekSales />
                    <LastWeekSales />
                </div>
                <div className="flex">
                    <CurrenttMonthSales />
                    <LastMonthSales />
                </div>
            </div>
            <h2 className="text-center text-2xl font-semibold mb-5">Productos</h2>
        </div>
    );
};
