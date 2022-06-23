import React from 'react'
import { CG } from 'cap-shared-components'
import { formatted_data_template, grouped_options } from '../Data/Format'

export const BarChart = (chartData) => {
  const formatted_data = structuredClone(formatted_data_template)
  const formatChartData = (data) => {
    if (data) {
      data.forEach((item) => {
        formatted_data.labels.push(item['skill_name'])
        formatted_data.datasets[1].data.push(item['demand_count'])
        formatted_data.datasets[0].data.push(item['supply_count'])
      })
    }

    return formatted_data
  }

  return <CG.BarChart data={formatChartData(chartData.data)} options={grouped_options} />
}
