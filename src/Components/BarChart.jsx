import React from 'react'
import { CG } from 'cap-shared-components'
import { groupedData, groupedOptions } from '../Data/Data'


export const BarChart = () => {
  return <CG.BarChart data={groupedData} options={groupedOptions} />
}
