import React from 'react'
import { ChartCard, TrendingBox } from '../../../styles'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { TrendingList } from './styles';


ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
    labels: [],
    datasets: [
        {
            label: '# of Votes',
            data: [24, 5, 14, 19, 27, 10, 15, 8, 12, 7],
            backgroundColor: [
                '#00f5d4',
                '#ffd000',
                '#ff7900',
                '#d9ed92',
                '#FD7272',
                'rgba(64, 255, 153, 1)',
                '#07beb8',
                '#858ae3',
                '#ffb5a7',
                '#00bbf9',
            ],
            borderWidth: 0,
        },
    ],
};

export const TrendingChart = () => {
    return (
        <ChartCard style={{ width: 600, flexDirection: 'row' }} >
            <TrendingBox>
                <Doughnut data={data} />
            </TrendingBox>
            <TrendingList>
                <li>
                    <p>Fluconazole</p>
                    <p>Syrup</p>
                </li>
                <li>
                    <p>Benacycline Tetracycline</p>
                    <p>Children syrup</p>
                </li>
                <li>
                    <p>Mupiderm Ointment</p>
                    <p>Cream</p>
                </li>
                <li>
                    <p>Clomid Clomiphene Citrate</p>
                    <p>Tablet</p>
                </li>
                <li>
                    <p>Bexfit Omeprazole</p>
                    <p>Capsules</p>
                </li>
            </TrendingList>
        </ChartCard>
    )
}

