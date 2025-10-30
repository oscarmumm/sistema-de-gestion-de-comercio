import { PieChart, ResponsiveContainer, Pie } from 'recharts';
import { getPaymentMethodsByDate } from '../../api/sales';
import { useEffect, useState } from 'react';

type PaymentMethodParticipationChartProps = {
    from: string;
    until: string;
    title: string;
};

type fetchSalesProps = {
    from: string;
    until: string;
};

export const PaymentMethodParticipationChart = ({
    from,
    until,
    title,
}: PaymentMethodParticipationChartProps) => {
    const [paymentMethodSalesData, setPaymentMethodSalesData] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            await fetchSales({ from, until });
        };
        loadData();
    }, []);

    const fetchSales = async ({ from, until }: fetchSalesProps) => {
        try {
            const res = await getPaymentMethodsByDate({ from, until });
            const formattedData = res.data.map(
                (el: { name: string; total: string }) => ({
                    name: el.name,
                    total: parseFloat(el.total),
                })
            );
            console.log(formattedData);
            setPaymentMethodSalesData(formattedData);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="text-sm bg-slate-50 rounded-lg shadow-lg p-5 w-xl mb-5">
            <h3 className="font-semibold mb-3">Participación Métodos de Pago {title}</h3>
            <ResponsiveContainer width="100%" aspect={2}>
                <PieChart>
                    <Pie
                        data={paymentMethodSalesData}
                        dataKey="total"
                        nameKey="name"
                        fill="#8884d8"
                        label={({ name }) => name}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};
