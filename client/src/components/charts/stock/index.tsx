import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { CardColumn, CardValue, CardMarker, ChartCard } from '../../../pages/styles';
import { StocksCardIcon, UniqueIcon, CategoriesIcon } from '../../icons/markers';


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

export const StockChart = () => {
    return (
        <ChartCard style={{ width: 450 }} >
            {/* <CardColumn>
                <CardValue l={true}>
                    <CardMarker color='#00a3fe15' >
                        <StocksCardIcon />
                    </CardMarker>
                    <h6>Stocks</h6>
                    <h1>1,250</h1>
                </CardValue>
                <CardValue>
                    <CardMarker color='#a7288115' >
                        <UniqueIcon />
                    </CardMarker>
                    <h6>Unique Stocks</h6>
                    <h1>417</h1>
                </CardValue>
            </CardColumn>
            <CardColumn>
                <CardValue l={true}>
                    <CardMarker color='#f9b70e17' >
                        <CategoriesIcon />
                    </CardMarker>
                    <h6>Categories</h6>
                    <h1>10</h1>
                </CardValue>
                <CardValue>
                    <CardMarker color='#28a74615' />
                    <h6>Total Value</h6>
                    <h1>284,700</h1>
                </CardValue>
            </CardColumn> */}
        </ChartCard>
    )
}

