export const lowerCaseKeys = (obj) => {
  let lowerCased = {}

  for (const key in obj) {
    const newKey = key[0].toLowerCase() + key.slice(1)
    lowerCased[newKey] = obj[key]
  }
  return lowerCased
}

export const getRequiredBarchartDemandStatus = (allDemand) => {
  const filteredDemands = allDemand.filter((demand) => {
    return (
      demand.Status === 'Profiles Required' ||
      demand.Status === 'Demand Validation' ||
      demand.Status === 'Profile Proposed'
    )
  })
  return filteredDemands
}

export const getRequiredBarchartSupplyStatus = (allSupply) => {
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
