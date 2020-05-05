import React, {useRef} from 'react'
import {Bar}           from 'react-chartjs-2'

export interface IBarChartProps {
  label ?: string
  chartData : any
}

const BarChart = ({chartData,label} : IBarChartProps) => {
  const chartRef = useRef(null)
  const data = {
    labels: ['January', 'February', 'March',
      'April', 'May'],
    datasets: [
      {
        label: label,
        backgroundColor: 'rgb(24, 66, 100)',
        borderColor: 'rgba(0,0,0,0.35)',
        borderWidth: 0.5,
        data: chartData
      }
    ]
  }

  return (
    <Bar ref={chartRef} data={data} />
  )
}

export default BarChart

