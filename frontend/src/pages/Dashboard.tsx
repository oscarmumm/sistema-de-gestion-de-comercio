import { SalesByDateLineChart } from '../components/charts/SalesByDateLineChart';
import { getDateRange } from '../utils/utils';
import type { DateRange } from '../types';
import { useState } from 'react';

export const Dashboard = () => {
    const [currentWeek] = useState<DateRange>(getDateRange('currentWeek'));
    const [previousWeek] = useState<DateRange>(getDateRange('previousWeek'));
    const [currentMonth] = useState<DateRange>(getDateRange('currentMonth'));
    const [previousMonth] = useState<DateRange>(getDateRange('previousMonth'));

    return (
        <div className='min-h-12 min-w-12'>
            <h2 className='text-center text-2xl font-semibold mb-5'>Dashboard</h2>
            <div className='flex flex-col'>
                <div className='flex flex-col'>
                    <div className='flex gap-4'>
                        <SalesByDateLineChart
                            from={currentWeek.from}
                            until={currentWeek.until}
                            period='Semana Actual'
                        />
                        <SalesByDateLineChart
                            from={previousWeek.from}
                            until={previousWeek.until}
                            period='Semana Anterior'
                        />
                    </div>
                    <div className='flex gap-4'>
                        <SalesByDateLineChart
                            from={currentMonth.from}
                            until={currentMonth.until}
                            period='Mes Actual'
                        />
                        <SalesByDateLineChart
                            from={previousMonth.from}
                            until={previousMonth.until}
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
