import formValidators from '../../formValidatorsConfig.json'

export const formatSkills = (data, skillId) => {
  const formatted_skills = []
  var default_skill
  data.forEach((skill) => {
    if (skill.id === skillId) {
      default_skill = skill.SkillName
    }
    formatted_skills.push({
      name: skill.name,
      value: skill.id,
    })
  })
  return [formatted_skills, default_skill]
}

export const formatClients = (data) => {
  const formatted_Clients = []
  data.forEach((client) => {
    formatted_Clients.push({
      name: client.name,
      value: client.id,
    })
  })
  return formatted_Clients
}
export const clientFormFormatter = () => {
  const inputValidator = formValidators.addClientForm.inputs
  const inputDefaults = {
    id: {
      label: 'Client ID',
      placeholder: '',
      inputType: 'text',
      validators: inputValidator.id.validators,
    },

    name: {
      label: 'Client Name',
      placeholder: '',
      inputType: 'text',
      validators: inputValidator.name.validators,
    },
  }
  return inputDefaults
}

export const demandFormFormatter = (pickerClients, pickerSkills, demand_grade, demand_status) => {
  const inputValidator = formValidators.demandForm.inputs
  const inputDefaults = {
    codeRequisition: {
      label: 'Code Requisition',
      inputType: 'text',
      placeholder: '',
      validators: inputValidator.codeRequisition.validators,
    },
    startDate: {
      label: 'Start date',
      inputType: 'text',
      placeholder: 'DD/MM/YYYY',
      validators: inputValidator.startDate.validators,
    },
    id: {
      options: pickerClients,
      label: 'Client Name',
      inputType: 'dropdown',
      placeholder: 'Select a client',
      validators: inputValidator.id.validators,
    },
    originatorName: {
      label: 'Originator',
      inputType: 'text',
      placeholder: '',
      validators: inputValidator.originatorName.validators,
    },
    skills: {
      options: pickerSkills,
      label: 'Skill',
      inputType: 'dropdown',
      placeholder: 'Select a skill',
      validators: inputValidator.skills.validators,
    },
    probability: {
      label: 'Probability',
      inputType: 'text',
      placeholder: '',
      validators: inputValidator.probability.validators,
    },
    grade: {
      options: demand_grade,
      label: 'Grade',
      inputType: 'dropdown',
      placeholder: 'Select a grade',
      validators: inputValidator.grade.validators,
    },
    selectedApplicant: {
      label: 'Selected Applicant',
      inputType: 'text',
      placeholder: '',
      validators: inputValidator.selectedApplicant.validators,
    },
    status: {
      options: demand_status,
      label: 'Status',
      inputType: 'dropdown',
      placeholder: 'Select a status',
      validators: inputValidator.status.validators,
    },
    notes: {
      label: 'Notes',
      inputType: 'text',
      placeholder: '',
      validators: inputValidator.notes.validators,
    },
    proposedApplicant: {
      label: 'Proposed Applicant',
      inputType: 'text',
      placeholder: '',
      validators: inputValidator.proposedApplicant.validators,
    },
    creationDate: {
      label: 'Creation date',
      inputType: 'text',
      placeholder: 'DD/MM/YYYY',
      validators: inputValidator.creationDate.validators,
    },
    location: {
      label: 'Location',
      inputType: 'text',
      placeholder: '',
      validators: inputValidator.location.validators,
    },
  }
  return inputDefaults
}

export const supplyFormFormatter = (pickerStatus, pickerSkills, pickerType) => {
  const inputValidator = formValidators.supplyForm.inputs
  const inputDefaults = {
    applicantFirstName: {
      label: 'First name',
      placeholder: '',
      inputType: 'text',
      validators: inputValidator.applicantFirstName.validators,
    },
    applicantLastName: {
      label: 'Last name',
      placeholder: '',
      inputType: 'text',
      validators: inputValidator.applicantLastName.validators,
    },
    applicantStatus: {
      label: 'Status',
      placeholder: 'Select a status',
      options: pickerStatus,
      inputType: 'dropdown',
      validators: inputValidator.applicantStatus.validators,
    },
    applicantSkills: {
      label: 'Skill',
      placeholder: 'Select a skill',
      options: pickerSkills,
      inputType: 'dropdown',
      validators: inputValidator.applicantSkills.validators,
    },
    applicantNotes: {
      label: 'Notes',
      placeholder: '',
      inputType: 'text',
      validators: inputValidator.applicantNotes.validators,
    },
    applicantType: {
      label: 'Applicant type',
      placeholder: 'Select type',
      options: pickerType,
      inputType: 'dropdown',
      validators: inputValidator.applicantType.validators,
    },
    applicantLocation: {
      label: 'Location',
      placeholder: '',
      inputType: 'text',
      validators: inputValidator.applicantLocation.validators,
    },
  }
  return inputDefaults
}

export const formatDataForBarchart = (allSkills, filteredSupply, filteredDemand, supplyDataset, demandDataset) => {
  const dashboardDataset = {
    labels: [],
    datasets: [],
  }

  allSkills.forEach((skill, skillIndex) => {
    const skillName = skill.name
    dashboardDataset.labels.push(skillName)

    const supplies = filteredSupply.filter((supply) => supply.skillName === skillName)
    const demands = filteredDemand.filter((demand) => demand.skillName === skillName)
    supplyDataset.forEach((obj) => {
      const label = obj.label
      const labelSupplyCount = supplies.filter((supply) => supply.applicantStatus === label).length
      obj.data[skillIndex] = labelSupplyCount
    })
    demandDataset.forEach((obj) => {
      const label = obj.label
      const labelDemandCount = demands.filter((demand) => demand.status === label).length
      obj.data[skillIndex] = labelDemandCount
    })
  })
  dashboardDataset.datasets = [...supplyDataset, ...demandDataset]
  return dashboardDataset
}
