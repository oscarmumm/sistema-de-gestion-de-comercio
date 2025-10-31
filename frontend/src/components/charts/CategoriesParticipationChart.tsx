import { PieChart, ResponsiveContainer, Pie } from 'recharts';
import { useEffect, useState } from 'react';
import { getCategoriesSoldByDate } from '../../api/sales';

type CategoriesParticipationChartProps = {
    from: string;
    until: string;
    title: string;
};

type fetchSalesProps = {
    from: string;
    until: string;
};

export const CategoriesParticipationChart = ({
    from,
    until,
    title,
}: CategoriesParticipationChartProps) => {
    const [categoriesSalesData, setCategoriesSalesData] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            await fetchSales({ from, until });
        };
        loadData();
    }, []);

    const fetchSales = async ({ from, until }: fetchSalesProps) => {
        try {
            const res = await getCategoriesSoldByDate({ from, until });
            const formattedData = res.data.map(
                (el: { name: string; total: string }) => ({
                    name: el.name,
                    total: parseFloat(el.total),
                })
            );
            console.log(formattedData);
            setCategoriesSalesData(formattedData);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="text-sm bg-slate-50 rounded-lg shadow-lg p-5 w-xl mb-5">
            <h3 className="font-semibold mb-3">{title}</h3>
            <ResponsiveContainer width="100%" aspect={2}>
                <PieChart>
                    <Pie
                        data={categoriesSalesData}
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
