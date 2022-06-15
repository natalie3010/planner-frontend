import React from 'react'
import { CG } from 'cap-shared-components'
import { groupedData, groupedOptions } from '../Data/Data'

export const BarChart = (chartData) => {
  const formatChartData = (data) => {
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
      data.forEach((item) => {
        formatted_data.labels.push(item['skill_name'])
        formatted_data.datasets[1].data.push(item['demand_count'])
        formatted_data.datasets[0].data.push(item['supply_count'])
      })
    }

    return formatted_data
  }

  return <CG.BarChart data={formatChartData(chartData.data)} options={groupedOptions} />
}
