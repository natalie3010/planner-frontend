import React from 'react'
import { CG } from 'cap-shared-components'
import { formatted_data, grouped_options } from '../Data/Format'

export const BarChart = (chartData) => {
  /**
   * created a clone for formatted_data as every rerender was appending to
   * its self causing duplicate value for the chart
   */
  const clone_formatted_data = structuredClone(formatted_data)
  const formatChartData = (data) => {
    if (data) {
      data.forEach((item) => {
        clone_formatted_data.labels.push(item['skill_name'])
        clone_formatted_data.datasets[1].data.push(item['demand_count'])
        clone_formatted_data.datasets[0].data.push(item['supply_count'])
      })
    }

    return clone_formatted_data
  }

  return <CG.BarChart data={formatChartData(chartData.data)} options={grouped_options} />
}
