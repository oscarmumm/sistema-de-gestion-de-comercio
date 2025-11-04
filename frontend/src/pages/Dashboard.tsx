import { SalesByDateLineChart } from '../components/charts/SalesByDateLineChart';
import { getDateRange } from '../utils/utils';
import type { DateRange } from '../types';
import { useState } from 'react';
import { ProductsSoldByDateChart } from '../components/charts/ProductsSoldByDateChart';
import { PaymentMethodParticipationChart } from '../components/charts/PaymentMethodParticipationChart';
import { CategoriesParticipationChart } from '../components/charts/CategoriesParticipationChart';
import { LowestStockProductsChart } from '../components/charts/LowestStockProductsChart';

export const Dashboard = () => {
    const [currentWeek] = useState<DateRange>(getDateRange('currentWeek'));
    const [previousWeek] = useState<DateRange>(getDateRange('previousWeek'));
    const [currentMonth] = useState<DateRange>(getDateRange('currentMonth'));
    const [previousMonth] = useState<DateRange>(getDateRange('previousMonth'));

    return (
        <div>
            <div className="flex flex-col">
                <h2 className="my-5 font-bold text-2xl ">Dashboard</h2>
                <h3 className="text-center text-2xl font-semibold mb-5">
                    Ventas
                </h3>
                <div className="flex flex-col">
                    <div className="flex gap-4">
                        <SalesByDateLineChart
                            from={currentWeek.from}
                            until={currentWeek.until}
                            period="SEMANA ACTUAL"
                        />
                        <SalesByDateLineChart
                            from={previousWeek.from}
                            until={previousWeek.until}
                            period="SEMANA ANTERIOR"
                        />
                    </div>
                    <div className="flex gap-4">
                        <SalesByDateLineChart
                            from={currentMonth.from}
                            until={currentMonth.until}
                            period="MES ACTUAL"
                        />
                        <SalesByDateLineChart
                            from={previousMonth.from}
                            until={previousMonth.until}
                            period="MES ANTERIOR"
                        />
                    </div>
                </div>
            </div>
            <div className="flex gap-4">
                <PaymentMethodParticipationChart
                    from={previousMonth.from}
                    until={previousMonth.until}
                    title="Participación de Métodos de Pago MES ANTERIOR"
                />
                <PaymentMethodParticipationChart
                    from={currentMonth.from}
                    until={currentMonth.until}
                    title="Participación de Métodos de Pago MES ACTUAL"
                />
            </div>
            <div className="mb-3">
                <h3 className="text-center text-2xl font-semibold mb-5">
                    Productos
                </h3>
                <ProductsSoldByDateChart
                    from={previousMonth.from}
                    until={previousMonth.until}
                    title="Productos Mas Vendidos MES ANTERIOR (por unidad)"
                />
                <ProductsSoldByDateChart
                    from={currentMonth.from}
                    until={currentMonth.until}
                    title="Productos Mas Vendidos MES ACTUAL (por unidad)"
                />

                <div className='flex gap-3'>
                    <CategoriesParticipationChart
                        from={previousMonth.from}
                        until={previousMonth.until}
                        title="Participación de Categorías de Productos MES ANTERIOR"
                    />
                    <CategoriesParticipationChart
                        from={currentMonth.from}
                        until={currentMonth.until}
                        title="Participación de Categorías de Productos MES ACTUAL"
                    />
                </div>
                <LowestStockProductsChart />
            </div>
        </div>
    );
};
