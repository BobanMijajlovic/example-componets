import React, {useState} from 'react'
import LineChart         from './LineChart'
import {Select}          from '../basic/withState'
import BarChart          from './BarChart'
import PieChart          from './PieChart'
import DoughnutChart     from './DoughnutChart'

interface IItemChartState {
  labelsType : 'weekly' | 'monthly' | 'year',
  chartType : 'line'| 'pie' | 'doughnut' | 'bar'
}

const selectChartsOptions = [
  {
    label: 'Line Chart',
    value: 'line'
  },
  {
    label: 'Pie Chart',
    value: 'pie'
  },
  {
    label: 'Doughnut Chart',
    value: 'doughnut'
  },
  {
    label: 'Bar Chart',
    value: 'bar'
  }
]

const Chart = ({title} : {title : string}) => {

  const [state,setState] : [IItemChartState,(r : IItemChartState) => void] = useState({
    labelsType : 'monthly',
    chartType: 'line'
  } as IItemChartState)

  const handlerOnChangeChartType = (e : React.ChangeEvent<HTMLSelectElement>) => {
    setState({
      ...state,
      chartType: e.target.value as any
    })
  }

  const renderChartByType = () => {
    switch (state.chartType) {
      case 'line': return <LineChart label={title} chartData={[65, 59, 80, 81, 56, 55, 40]}/>
      case 'bar': return <BarChart label={title} chartData={[65, 59, 80, 81, 56]}/>
      case 'pie': return <PieChart label={title} chartData={[65, 59, 80, 81, 56]}/>
      case 'doughnut': return <DoughnutChart label={title} chartData={[65, 59, 80, 81, 56]}/>
    }
  }

  return (
    <div className={'d-flex flex-column flex-fill'}>
      <div className={'d-flex justify-content-between align-items-center'}>
        <div style={{minWidth: 160}}>
          <Select
              label={'Chart'}
              onChange={handlerOnChangeChartType}
              options={selectChartsOptions}
              value={state.chartType}
          />
        </div>
      </div>
      <div>
        { renderChartByType() }
      </div>
    </div>

  )
}

export default Chart
