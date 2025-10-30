import { SalesByDateLineChart } from '../components/charts/SalesByDateLineChart';

export const Dashboard = () => {
    return (
        <div className='min-h-12 min-w-12'>
            <h2 className='text-center text-2xl font-semibold mb-5'>Ventas</h2>
            <div className='flex flex-col'>
                <div className='flex flex-col'>
                    <div className='flex gap-4'>
                        <SalesByDateLineChart
                            from='2025-10-27'
                            until='2025-10-29'
                            period='Semana Actual'
                        />
                        <SalesByDateLineChart
                            from='2025-10-20'
                            until='2025-10-26'
                            period='Semana Anterior'
                        />
                    </div>
                    <div className='flex gap-4'>
                        <SalesByDateLineChart
                            from='2025-10-01'
                            until='2025-10-29'
                            period='Mes Actual'
                        />
                        <SalesByDateLineChart
                            from='2025-09-01'
                            until='2025-09-30'
                            period='Mes Anterior'
                        />
                    </div>
                </div>
            </div>
            <h2 className='text-center text-2xl font-semibold mb-5'>
                Productos
            </h2>
        </div>
    );
};
