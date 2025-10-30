import { SalesByDateLineChart } from '../components/charts/SalesByDateLineChart';
import { getDateRange } from '../utils/utils';
import type { DateRange } from '../types';
import { useState } from 'react';
import { ProductsSoldByDateChart } from '../components/charts/ProductsSoldByDateChart';
import { PaymentMethodParticipationChart } from '../components/charts/PaymentMethodParticipationChart';

export const Dashboard = () => {
    const [currentWeek] = useState<DateRange>(getDateRange('currentWeek'));
    const [previousWeek] = useState<DateRange>(getDateRange('previousWeek'));
    const [currentMonth] = useState<DateRange>(getDateRange('currentMonth'));
    const [previousMonth] = useState<DateRange>(getDateRange('previousMonth'));

    return (
        <div className="">
            <div className="flex flex-col">
                <h2 className="my-5 font-semibold text-xl">Dashboard</h2>
                <h3 className="text-center text-2xl font-semibold mb-5">
                    Ventas
                </h3>
                <div className="flex flex-col">
                    <div className="flex gap-4">
                        <SalesByDateLineChart
                            from={currentWeek.from}
                            until={currentWeek.until}
                            period="Semana Actual"
                        />
                        <SalesByDateLineChart
                            from={previousWeek.from}
                            until={previousWeek.until}
                            period="Semana Anterior"
                        />
                    </div>
                    <div className="flex gap-4">
                        <SalesByDateLineChart
                            from={currentMonth.from}
                            until={currentMonth.until}
                            period="Mes Actual"
                        />
                        <SalesByDateLineChart
                            from={previousMonth.from}
                            until={previousMonth.until}
                            period="Mes Anterior"
                        />
                    </div>
                </div>
            </div>
            <div>
                <PaymentMethodParticipationChart
                    from={previousMonth.from}
                    until={previousMonth.until}
                    title="Mes Anterior"
                />
            </div>
            <div className="mb-3">
                <h3 className="text-center text-2xl font-semibold mb-5">
                    Productos
                </h3>
                <ProductsSoldByDateChart
                    from={previousMonth.from}
                    until={previousMonth.until}
                    title="Productos Mas Vendidos Último Mes (por unidad)"
                />
                <ProductsSoldByDateChart
                    from={currentMonth.from}
                    until={currentMonth.until}
                    title="Productos Mas Vendidos Este Mes (por unidad)"
                />
            </div>
        </div>
    );
};
