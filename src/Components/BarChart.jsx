import React from 'react'
import { CG } from 'cap-shared-components'
import { formatted_data_template, grouped_options } from '../Data/Format'

export const BarChart = (chartData) => {
  const formatted_data = structuredClone(formatted_data_template)

  const clickedElementPassUp = (element) => {
    const type = formatted_data.datasets[element[0].datasetIndex].label
    const skillName = chartData.data[element[0].index].skill_name

    console.log(type, skillName)

    if ((type = 'demand')) {
      navigate('/demandinfo')
    } else if ((type = 'supply')) {
      navigate('/supplyinfo')
    }
  }
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
          //  console.log(formatChartData(chartData.data).datasets[chart.getElementAtEvent(evt)[0]._datasetIndex].label)
          console.log(formatted_data.datasets[evt[0].datasetIndex].label)
          console.log(chartData.data[evt[0].index].skill_name)
          //  alert(data.datasets[0].data[myLineChart.getElementAtEvent(evt)[0]._index]);
        },
      }}
      clickedElementPassUp={clickedElementPassUp}
    />
  )
}
