import React from 'react'
import { CG } from 'cap-shared-components'
import { formatted_data, grouped_options } from '../Data/Format'
import { useNavigate } from 'react-router-dom'
//import "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js"
//import "jscript/graph.js"
export const BarChart = (chartData) => {
  const navigate = useNavigate()
  const formatChartData = (data) => {
    if (data) {
      console.log(data)
      data.forEach((item) => {
        formatted_data.labels.push(item['skill_name'])
        formatted_data.datasets[1].data.push(item['demand_count'])
        formatted_data.datasets[0].data.push(item['supply_count'])
      })
    }

    return formatted_data
  }

  return (
    <CG.BarChart
      data={formatChartData(chartData.data)}
      options={{
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
        onClick: function (evt) {
          console.log(formatted_data)
          console.log(formatted_data.labels)

          /*     console.log(formatChartData(chartData.data).datasets[0].data[chart.getElementAtEvent(evt)[0]._index])
      const value = chart.scales.x.getValueForPixel(EventTarget)
      console.log(value) */
          // navigate(`/supplyinfo/:${skill_name}`)
          console.log(formatChartData(chartData.data).datasets[chart.getElementAtEvent(evt)[0]._datasetIndex].label)
          //  alert(data.datasets[0].data[myLineChart.getElementAtEvent(evt)[0]._index]);
        },
      }}
    />
  )
}
