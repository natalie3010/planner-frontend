import React, { useEffect } from 'react'
import { CG } from 'cap-shared-components'
import { formatted_data_template, grouped_options } from '../Data/Format'

export const BarChart = ({ chartData, navigateToListPage, allDemand, allSupply, allSkills }) => {
  const formatted_data = structuredClone(formatted_data_template)

  const clickedElementPassUp = (element) => {
    const type = formatted_data.datasets[element[0].datasetIndex].label
    const skillName = chartData[element[0].index].skill_name

    navigateToListPage(type, skillName)
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

  const getRequiredDemandStatus = (allDemand) => {
    const filteredDemands = allDemand.filter((demand) => {
      /* return (
        demand.Status === 'Profiles Required' || 'Demand Validation' || 'Profile Proposed'
      ) */
      return (
        demand.Status === 'Profiles Required' ||
        demand.Status === 'Demand Validation' ||
        demand.Status === 'Profile Proposed'
      )
    })
    return filteredDemands
  }

  const getRequiredSupplyStatus = (allSupply) => {
    const filteredSupplys = allSupply.filter((supply) => {
      return (
        supply.ApplicantStatus === 'Screening' ||
        supply.ApplicantStatus === 'L1 select' ||
        supply.ApplicantStatus === 'L2 select' ||
        supply.ApplicantStatus === 'Client select'
      )
    })
    return filteredSupplys
  }

  const formatSkillForBarchart = (allSkills, filteredSupply, filteredDemand) => {
    allSkills.forEach((skill, index) => {
      const skillName = skill.SkillName
      console.log(skillName, ' index ', index)
      const supplies = filteredSupply.filter((supply) => supply.SkillName === skillName)
      const demands = filteredDemand.filter((demand) => demand.SkillName === skillName)
      console.log('Supplies for skill ', supplies)
      console.log('Demands for skill ', demands)
    })
  }

  useEffect(() => {
    const filteredDemand = getRequiredDemandStatus(allDemand)
    const filteredSupply = getRequiredSupplyStatus(allSupply)
    console.log('Demand ', filteredDemand)
    console.log('Supply ', filteredSupply)
    console.log(allSkills)
    formatSkillForBarchart(allSkills, filteredSupply, filteredDemand)
  }, [allDemand, allSupply])

  return (
    <CG.Box width='48rem' boxSizing='border-box'>
      <CG.BarChart
        data={formatChartData(chartData)}
        options={grouped_options}
        clickedElementPassUp={clickedElementPassUp}
      />
    </CG.Box>
  )
}
