import React, { useEffect, useState } from 'react'
import { CG } from 'cap-shared-components'
import { demandDataset, groupedOptions, supplyDataset } from '../Data/Data'

export const BarChart = ({ navigateToListPage, allDemand, allSupply, allSkills }) => {
  const [formattedStackedData, setFormattedStackedData] = useState(null)

  const clickedElementPassUp = (element) => {
    // datasetIndex is the label, it includes both supply and demand
    const type = element[0].datasetIndex <= 3 ? 'supply' : 'demand'
    const skillName = allSkills[element[0].index].SkillName

    navigateToListPage(type, skillName)
  }

  const getRequiredDemandStatus = (allDemand) => {
    const filteredDemands = allDemand.filter((demand) => {
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
