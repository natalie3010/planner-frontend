import React, { useEffect, useState } from 'react'
import { CG } from 'cap-shared-components'
import { formatted_data_template, grouped_options } from '../Data/Format'
import { demandDataset, groupedOptions, supplyDataset } from '../Data/Data'

export const BarChart = ({ chartData, navigateToListPage, allDemand, allSupply, allSkills }) => {
  const [formattedStackedData, setFormattedStackedData] = useState(null)
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
    const dashboardDataset = {
      labels: [],
      datasets: [],
    }

    allSkills.forEach((skill, skillIndex) => {
      const skillName = skill.SkillName
      dashboardDataset.labels.push(skillName)

      const supplies = filteredSupply.filter((supply) => supply.SkillName === skillName)
      const demands = filteredDemand.filter((demand) => demand.SkillName === skillName)

      supplyDataset.forEach((obj) => {
        const label = obj.label
        const labelSupplyCount = supplies.filter((supply) => supply.ApplicantStatus === label).length
        obj.data[skillIndex] = labelSupplyCount
      })
      demandDataset.forEach((obj) => {
        const label = obj.label
        const labelDemandCount = demands.filter((demand) => demand.Status === label).length
        obj.data[skillIndex] = labelDemandCount
      })
    })
    dashboardDataset.datasets = [...supplyDataset, ...demandDataset]
    return dashboardDataset
  }

  useEffect(() => {
    const filteredDemand = getRequiredDemandStatus(allDemand)
    const filteredSupply = getRequiredSupplyStatus(allSupply)
    const formattedDataset = formatSkillForBarchart(allSkills, filteredSupply, filteredDemand)
    setFormattedStackedData(formattedDataset)
  }, [allDemand, allSupply, allSkills])

  if (!formattedStackedData) {
    return <>...loading</>
  }
  return (
    <CG.Box width='48rem' boxSizing='border-box'>
      <CG.BarChart data={formattedStackedData} options={groupedOptions} clickedElementPassUp={clickedElementPassUp} />
    </CG.Box>
  )
}
