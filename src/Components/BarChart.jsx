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
    getBarChartData().then((data) => {
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
        barChartData.supplyDataset,
        barChartData.demandDataset
      )
      setFormattedStackedData(formattedDataset)
    }
  }, [barChartData, allDemand, allSupply, allSkills])

  if (!formattedStackedData) {
    return <>...loading</>
  }
  return (
    <CG.Box width='69rem' boxSizing='border-box'>
      <CG.BarChart
        data={formattedStackedData}
        options={barChartData.horizontalOptions}
        clickedElementPassUp={clickedElementPassUp}
      />
    </CG.Box>
  )
}
