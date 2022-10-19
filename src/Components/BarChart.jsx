import React, { useEffect, useState } from 'react'
import { CG } from 'cap-shared-components'
import { getRequiredBarchartDemandStatus, getRequiredBarchartSupplyStatus } from '../Utils/util'
import { formatDataForBarchart } from '../Data/Format'
import { getBarChartData } from '../API'

export const BarChart = ({ navigateToListPage, allDemand, allSupply, allSkills }) => {
  const [formattedStackedData, setFormattedStackedData] = useState(null)
  const [barChartData, setBarChartData] = useState(null)

  const clickedElementPassUp = (element) => {
    // datasetIndex is the label, it includes both supply and demand
    const type = element[0].datasetIndex <= 3 ? 'supply' : 'demand'
    const skillID = allSkills[element[0].index].id
    navigateToListPage(type, skillID)
  }
  useEffect(() => {
    getBarChartData(authToken).then((data) => {
      setBarChartData(data)
    })
  }, [])
  useEffect(() => {
    const filteredDemand = getRequiredBarchartDemandStatus(allDemand)
    const filteredSupply = getRequiredBarchartSupplyStatus(allSupply)
    if (barChartData) {
      const formattedDataset = formatDataForBarchart(
        allSkills,
        filteredSupply,
        filteredDemand,
        barchartData.supplyDataset,
        barchartData.demandDataset
      )
      setFormattedStackedData(formattedDataset)
    }
  }, [barChartData, allDemand, allSupply, allSkills])

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
