import { useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { TrendingBox, TrendsCont } from './styles';
import { GET_TRENDS } from '../../../graphql/queries/charts';
import { useQuery } from '@apollo/client';
import { TrendsList } from './list';
import { ButtonsBox, ButtonsCont, HeaderCont, CheckCont, LoadingCont, MenuList, SwitchBtn } from '../styles';
import { SpinLoader } from '../../loaders';
import { ArrowDown, Marker } from '../../icons';
import { Divider } from '../../headers/stylesx';


export const colors = [
    '#00f5d4',
    '#ffd000',
    '#ff7900',
    '#d9ed92',
    '#C69749',
    '#FEBE8C',
    '#07beb8',
    '#858ae3',
    '#FF8DC7',
    '#00bbf9',
]

export const TrendsChart = () => {
    ChartJS.register(ArcElement, Tooltip, Legend);
  
    const [view, setView] = useState('Stocks')
    const [duration, setDuration] = useState('Week')
    const [menu, setMenu] = useState('')

    const { loading, data:d, error } = useQuery(GET_TRENDS,{
        variables: {
            item: view.toLowerCase(),
            duration: duration.toLowerCase()
        },
        fetchPolicy: "network-only",
    })

    if(error) console.log({ error })

    let chartList: any= [];
    let chartdata: any = [];
    
    if(d) {
        d.trends.forEach((item: any, i: number)=>{
            chartList[i] = item.items[0]
            chartdata[i] = item.totalSalesCount
        })
    }
    const data = {
        datasets: [
            {
                label: '# of Votes',
                borderWidth: 0,
                data: chartdata,
                backgroundColor: colors,
            },
        ],
    };

    var options = {
        responsive: true,
        cutout: 95,
    };


    const selectDuration = (duration: string)=>{
        setDuration( duration)
        setMenu('')
    }
    const selectView = (view: string)=>{
        setView(view)
        setMenu('')
    }

    return (
        <TrendsCont>
            <HeaderCont>
                <h5>Top 10</h5>
                <ButtonsBox>
                    <ButtonsCont>
                        <SwitchBtn onClick={() => setMenu('view')}>
                            <p>{view}</p>
                            <ArrowDown />
                        </SwitchBtn>
                        {
                            menu === 'view' &&
                            <MenuList h={62} onMouseLeave={() => setMenu('')}>
                                <li onClick={() => selectView('Stocks')}>
                                    <CheckCont> {
                                        view === 'Stocks' &&
                                        <Marker />
                                    }
                                    </CheckCont>
                                    <p>Stocks</p>
                                    <Divider />
                                </li>
                                <li onClick={() => selectView('Categories')}>
                                    <CheckCont>{
                                        view === 'Categories' &&
                                        <Marker />
                                    }
                                    </CheckCont>
                                    <p>Categories</p>
                                </li>
                            </MenuList>
                        }
                    </ButtonsCont>
                    <ButtonsCont>
                        <SwitchBtn onClick={() => setMenu('duration')}>
                            <span style={{ color: 'lightgrey' }}>
                                This:
                            </span>
                            <p>{duration}</p>
                            <ArrowDown />
                        </SwitchBtn> {
                            menu === 'duration' &&
                            <MenuList onMouseLeave={() => setMenu('')}>
                                <li onClick={() => selectDuration('Week')}>
                                    <CheckCont> {
                                        duration === 'Week' &&
                                        <Marker />
                                    }
                                    </CheckCont>
                                    <p>Week</p>
                                    <Divider />
                                </li>
                                <li onClick={() => selectDuration('Month')}>
                                    <CheckCont>{
                                        duration === 'Month' &&
                                        <Marker />
                                    }
                                    </CheckCont>
                                    <p>Month</p>
                                    <Divider />
                                </li>
                                <li onClick={() => selectDuration('Year')}>
                                    <CheckCont>{
                                        duration === 'Year' &&
                                        <Marker />
                                    }
                                    </CheckCont>
                                    <p>Year</p>
                                </li>
                            </MenuList>
                        }
                    </ButtonsCont>
                </ButtonsBox>
            </HeaderCont>{
            d ? 
            <>
                <TrendingBox>
                    <Doughnut data={data} options={options} />
                </TrendingBox>
                <TrendsList inview={view} listItems={chartList}/>
            </>
            :
            <LoadingCont>
                <SpinLoader size={'40px'} />
            </LoadingCont>
        }
        </TrendsCont>
    )
}

