import React from 'react'
import { ChartCard } from '../../../styles'
import { TransChartCont, TransCard } from './styles'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
// import faker from 'faker';



ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: false,
    },
    legend: {
      position: 'top' as const,
      display: false
    }
  },
  tooltips: {
    enabled: false
  },
  scales: {
    x: {
       grid: {
          display: false,
          borderColor: 'whitesmoke',
          color: "blue"
      },
      ticks: {
        color: 'lightgrey',
        font: {
          size: 10
        }
      }
    },
    y: {
      type: 'linear' as const,
      position: 'left' as const,
      grid: {
        borderColor: 'whitesmoke',
      },
      ticks: {
        color: 'lightgrey',
        font: {
          size: 10
        },
        stepSize: 100
      }
    },
    y1: {
      display: false,
    },
  },
};

const labels = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Sales',
//       data: labels.map(() => faker.datatype.number({ min: 0, max: 500 })),
//       borderColor: '#80ed99',
//       backgroundColor: '#80ed99',
//       borderWidth: 1,
//       yAxisID: 'y1',
//     },
//     {
//       label: 'Expenses',
//       data: labels.map(() => faker.datatype.number({ min: 0, max: 500 })),
//       borderColor: '#f941448d',
//       backgroundColor: '#f941448d',
//       borderWidth: 1,
//       yAxisID: 'y',
//     },
//   ],
// };

export const TransactionChart = ()=> {
  return (
      <TransCard style={{ width: 400 }} >
          <TransChartCont>
            {/* <Line options={options} data={data} /> */}
          </TransChartCont>
      </TransCard>
  )
}

