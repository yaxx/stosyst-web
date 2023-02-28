import { BarChartCont, TotalCont, TotalExpCont, TotalSalesCont } from './styles'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    BarElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_SALES_EXPENSES } from '../../../graphql/queries/charts';
import { SpinLoader } from '../../loaders';
import { formatMoney } from '../../../utils';
import { LoadingCont } from '../styles';
import { useState } from 'react';
import ChartCardHeader from '../header/cardHeader';


export const SalesExpenseChart = () => {

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
  );

  const [duration, setDuration] = useState('Weekly')
  // const [menu, setMenu] = useState('')

  const selectDuration = (range: string) => {
    setDuration(range)
    // setMenu('')
  }
  
  const L0 = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
  const L1 = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
  ]
  const L2 = [
    '2013','2014','2015', '2016', '2017', '2018', '2019', '2020','2021','2022',
    '2023','2024','2025','2026','2027','2028','2029','2030','2031'
  ]
  const wks = L0.slice(new Date().getDay(), new Date().getDay() + 7)
  const mnths = L1.slice(new Date().getMonth()+1, new Date().getMonth() + 13)
  let yrs = L2.slice(0, 10)

  const labels = duration === 'Weekly' ? wks : duration === 'Monthly' ? mnths : yrs

  let salesData: any = duration === 'Weekly' ? [0, 0, 0, 0, 0, 0, 0] : duration === 'Monthly' ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  let expenseData: any = duration === 'Weekly' ? [0, 0, 0, 0, 0, 0, 0] : duration === 'Monthly' ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  const getYearlyIndex=(id: number) => {
    const yrDiff = new Date().getFullYear() - id
    yrs = L2.slice(yrDiff, 10)
    return 9 - id
  }
  const getMonthlyIndex=(id: number) => {
    return 11 - id
   
  }
  const getWeeklyIndex = (id: number) => {
    return 6-id
  }
  const { loading, data: d, error } = useQuery(GET_SALES_EXPENSES,{
    variables: {
      duration,
    },
    fetchPolicy: "network-only",
  })

  const [refetchData, { loading: refetching, data: newData, error: refetchError }] = useLazyQuery(GET_SALES_EXPENSES,{
    fetchPolicy: "network-only",
  })

  if (error) console.log({error})

  const setData = (data: any)=>{
    const {sales, expenses} = data
    sales.forEach((record: any, i: number) => {
      salesData[duration === 'Weekly' ? getWeeklyIndex(record._id) : duration === 'Monthly' ? getMonthlyIndex(record._id) : getYearlyIndex(record._id)] = record.totalSales
    })
    expenses.forEach((record: any) => {
      expenseData[duration === 'Weekly' ? getWeeklyIndex(record._id) : duration === 'Monthly' ? getMonthlyIndex(record._id) : getYearlyIndex(record._id)] = record.totalExpenses
    })
  }

  if (d) {
    setData(d.salesExpenses)
  }

  const getNewData = (range: string) => {
    setDuration(range)
    refetchData({
      variables: {
        duration: range
      },
    })
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        display: false
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          color: 'white',
          borderColor: 'whitesmoke',
          backgroundColor: 'white',
        },
        ticks: {
          color: 'lightgrey',
          font: {
            size: 10
          }
        }
      },
      y: {
        grid: {
          display: true,
          color: 'whitesmoke',
          borderColor: 'whitesmoke',
          backgroundColor: 'white',
          zeroLineColor: '#ffcc33',
        },
        ticks: {
          color: 'lightgrey',
          font: {
            size: 11
          },
          stepSize: duration === 'Weekly' ? 20000 : 500000,
          callback: function (label: any, index: any) {
            return label === 0 ? '0' : label >= 1000 && label < 1000000 ? `${(label / 1000)}K` : label >= 1000000 ? `${(label / 1000000)}M`: label
          }
        },
      }
    }
  };

  const data = {
    labels,
    datasets: [
      {
        data: expenseData,
        backgroundColor: 'rgba(248, 11, 62, 0.398)',
      },
      {
        data: salesData,
        backgroundColor: 'rgba(53, 235, 74, 0.5)',
      },
      
    ],
    barThickness: 80
  };

  const getTotalSales = () => salesData.reduce((i: number, j: number) => i + j, 0)
  const getTotalExp = () => expenseData.reduce((i: number, j: number) => i + j, 0)
    
  return (
          <>
              <ChartCardHeader title="Sales" getNewDataCallback={getNewData}  selectDurationCallback={selectDuration} />  
            {
                d ? 
                <>
                    <TotalCont>
                      <TotalSalesCont>
                        <h6>Total Sales</h6>
                        <h4>{formatMoney(getTotalSales())}</h4>
                      </TotalSalesCont>
                      <TotalExpCont>
                        <h6>Total Expenses</h6>
                        <h4>{formatMoney(getTotalExp())}</h4>
                      </TotalExpCont>
                    </TotalCont>
                    <BarChartCont>
                      <Bar options={options} data={data} />
                    </BarChartCont>
                </>
                :
                <LoadingCont>
                  <SpinLoader size={'40px'} />
                </LoadingCont>
            } 
      </>
  )
}

