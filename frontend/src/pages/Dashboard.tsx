import { LastMonthSales } from '../components/charts/LastMonthSales';
import { LastWeekSales } from '../components/charts/LastWeekSales';

export const Dashboard = () => {
    return (
        <div className="min-h-12 min-w-12">
            <h2 className='text-center text-2xl font-semibold mb-5'>Dashboard</h2>
            <div className='flex flex-col'>
                <LastWeekSales />
                <LastMonthSales />
            </div>
        </div>
    );
};
