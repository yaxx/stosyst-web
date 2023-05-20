import { useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { GET_TRENDS } from '../../../graphql/queries/charts';
import { useQuery } from '@apollo/client';
import { ButtonsCont, HeaderCont, CheckCont, LoadingCont, MenuList, SwitchBtn } from '../styles';
import { SpinLoader } from '../../loaders';
import { TrendsCont } from '../trends/styles';
import { StaffChartBox, StaffsCont } from './styles';
import { TopStaffList } from './staffChartList';
import { Divider } from '../../headers/styles';
import { ArrowDown, Marker } from '../../icons';


export const colors = [
    '#b7f785', '#7783f7', '#FFFF00', '#FF6FB5', '#B2A4FF',
    '#FED049', '#FF6464', '#C539B4', '#00FFD1', '#31C6D4'
]

export const StaffsChart = () => {
    const [menu, setMenu] = useState('')
    const selectDuration = (duration: string) => {
        setDuration(duration)
        setMenu('')
    }
    ChartJS.register(ArcElement, Tooltip, Legend);


    const [duration, setDuration] = useState('Week')

    const { loading, data: d, error } = useQuery(GET_TRENDS, {
        variables: {
            duration: duration.toLowerCase()
        },
        fetchPolicy: "network-only",
    })

    if (error) console.log({ error })

    let chartList: any = [];
    let chartdata: any = [];

    if (d) {
        d.trends.forEach((item: any, i: number) => {
            chartList[i] = item._id
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
        cutout: 80,
        responsive: true,
    };
 

    return (
        <StaffsCont>
            <HeaderCont>
                <h5>Top staffs</h5>
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
            </HeaderCont>{
                d ?
                <>
                    <StaffChartBox>
                        <Doughnut data={data} options={options} />
                    </StaffChartBox>
                    <TopStaffList colorList={colors.slice(0, chartList.length)} list={chartList} />
                </>
                :
                <LoadingCont>
                    <SpinLoader size={'40px'} />
                </LoadingCont>
            }
        </StaffsCont>
    )
}

