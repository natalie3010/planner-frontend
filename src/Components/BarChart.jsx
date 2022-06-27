import React, { useContext } from 'react'
import { CG } from 'cap-shared-components'
import { formatted_data_template, grouped_options } from '../Data/Format'
import { useNavigate } from 'react-router-dom'

export const BarChart = (chartData) => {
  const navigate = useNavigate()
  const formatted_data = structuredClone(formatted_data_template)
  const clickedElementPassUp = (element) => {
    const type = formatted_data.datasets[element[0].datasetIndex].label
    const skillName = chartData.data[element[0].index].skill_name
    console.log(skillName)

    console.log(type, skillName)
  }
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
        onClick: async (evt, index) => {
          const num = await index[0].index
          console.log(index)
          const skillName = await formatted_data.labels[num]
          console.log(num)
          console.log(skillName)

          if (skillName === 'UI/UX Designer') {
            navigate('/demandinfo/UI UX Designer')
          } else {
            navigate(`/demandinfo/${skillName}`)
          }
        },
      }}
      clickedElementPassUp={clickedElementPassUp}
    />
  )
}
