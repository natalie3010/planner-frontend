export const lowerCaseKeys = (obj) => {
  const lowerCased = {}

  for (const key in obj) {
    const newKey = key[0].toLowerCase() + key.slice(1)
    lowerCased[newKey] = obj[key]
  }
  return lowerCased
}

export const getRequiredBarchartDemandStatus = (allDemand) => {
  return allDemand.filter((demand) => {
    return (
      demand.status === 'Profiles Required' ||
      demand.status === 'Demand Validation' ||
      demand.status === 'Profile Proposed'
    )
  })
}

export const getRequiredBarchartSupplyStatus = (allSupply) => {
  return allSupply.filter((supply) => {
    return (
      supply.status === 'Screening' ||
      supply.status === 'L1 select' ||
      supply.status === 'L2 select' ||
      supply.status === 'Client select'
    )
  })
}

