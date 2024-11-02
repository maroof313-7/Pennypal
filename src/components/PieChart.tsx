// PieChart.tsx
import React, { useEffect, useRef } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend); // Register elements

interface Expense {
    amount: number;
    category: string;
}

interface PieChartProps {
    expenses: Expense[];
}

const PieChart: React.FC<PieChartProps> = ({ expenses }) => {
    const chartData = {
        labels: expenses.map(expense => expense.category),
        datasets: [
            {
                label: 'Expenses',
                data: expenses.map(expense => expense.amount),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    return <Pie data={chartData} />;
};

export default PieChart;
