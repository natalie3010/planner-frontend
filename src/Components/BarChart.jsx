import React from 'react'
import { CG } from 'cap-shared-components'
import { groupedData, groupedOptions } from '../Data/Data'

export const BarChart = (chartData) => {
  const formatChartData = (data) => {
    data = data.data
    const formatted_data = {
      labels: [],
      datasets: [
        {
          label: 'Supply',
          data: [],
          backgroundColor: '#268D6C',
          stack: 'Stack 0',
        },
        {
          label: 'Demand',
          data: [],
          backgroundColor: '#DA7B11',
          stack: 'Stack 1',
        },
      ],
    }
    if (data) {
      for (let i = 0; i < data.length; i++) {
        const skill_name = data[i]['skill_name']
        const demand_count = data[i]['demand_count']
        const supply_count = data[i]['supply_count']
        formatted_data.labels.push(skill_name)
        formatted_data.datasets[1].data.push(demand_count)
        formatted_data.datasets[0].data.push(supply_count)
      }
    }
    return formatted_data
  }

  return <CG.BarChart data={formatChartData(chartData)} options={groupedOptions} />
}
