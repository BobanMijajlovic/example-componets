import React, {useRef} from 'react'
import {Pie}           from 'react-chartjs-2'

export interface IPieChartProps {
  label ?: string
  chartData : any
}

const PieChart = ({chartData,label} : IPieChartProps) => {
  const chartRef = useRef(null)
  const data = {
    labels: ['January', 'February', 'March',
      'April', 'May'],
    datasets: [
      {
        label: label,
        backgroundColor: [
          '#B21F00',
          '#C9DE00',
          '#2FDE00',
          '#00A6B4',
          '#6800B4'
        ],
        hoverBackgroundColor: [
          '#501800',
          '#4B5000',
          '#175000',
          '#003350',
          '#35014F'
        ],
        data: chartData
      }
    ]
  }
  return (
    <Pie ref={chartRef} data={data}/>
  )
}

export default PieChart
