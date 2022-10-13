import React, { useEffect, useState } from 'react'
import { CG } from 'cap-shared-components'
import barchartData from '../../barChartConfig.json'
import { getRequiredBarchartDemandStatus, getRequiredBarchartSupplyStatus } from '../Utils/util'
import { formatDataForBarchart } from '../Data/Format'

export const BarChart = ({ navigateToListPage, allDemand, allSupply, allSkills }) => {
  const [formattedStackedData, setFormattedStackedData] = useState(null)

  const clickedElementPassUp = (element) => {
    // datasetIndex is the label, it includes both supply and demand
    const type = element[0].datasetIndex <= 3 ? 'supply' : 'demand'
    console.log(type, 'type');
    console.log(allSkills, 'allSkills');
    console.log(element[0].index, 'element[0].index');
    const skillID = allSkills[element[0].index].id

    navigateToListPage(type, skillID)
  }

  useEffect(() => {
    const filteredDemand = getRequiredBarchartDemandStatus(allDemand)
    const filteredSupply = getRequiredBarchartSupplyStatus(allSupply)
    const formattedDataset = formatDataForBarchart(
      allSkills,
      filteredSupply,
      filteredDemand,
      barchartData.supplyDataset,
      barchartData.demandDataset
    )
    console.log(formattedDataset, 'formattedDataset');
    setFormattedStackedData(formattedDataset)
  }, [allDemand, allSupply, allSkills])

  if (!formattedStackedData) {
    return <>...loading</>
  }
  return (
    <CG.Box width='48rem' boxSizing='border-box'>
      <CG.BarChart
        data={formattedStackedData}
        options={barchartData.groupedOptions}
        clickedElementPassUp={clickedElementPassUp}
      />
    </CG.Box>
  )
}
