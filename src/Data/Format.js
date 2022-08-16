import formValidators from '../../formValidatorsConfig.json'

export const formatted_data_template = {
  labels: [],
  datasets: [
    {
      label: 'Supply',
      data: [],
      backgroundColor: '#268D6C',
      stack: 'Stack 0',
    },
    {
      label: 'Demand',
      data: [],
      backgroundColor: '#DA7B11',
      stack: 'Stack 1',
    },
  ],
}

export const grouped_options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
}

export const formatSkills = (data, skillId) => {
  const formatted_skills = []
  var default_skill
  data.forEach((skill) => {
    if (skill.SkillsID === skillId) {
      default_skill = skill.SkillName
    }
    formatted_skills.push({
      name: skill.SkillName,
      value: skill.SkillsID,
    })
  })
  return [formatted_skills, default_skill]
}

export const formatClients = (data) => {
  const formatted_Clients = []
  data.forEach((client) => {
    formatted_Clients.push({
      name: client.ClientID,
      value: client.ClientName,
    })
  })
  return formatted_Clients
}
export const clientFormFormatter = () => {
  const inputValidator = formValidators.clientForm.inputs
  const inputDefaults = {
    clientID: {
      label: 'Client ID',
      placeholder: '',
      inputType: 'text',
      validators: inputValidator.clientLName.validators,
      responseKey: 'ClientID',
    },

    clientName: {
      label: 'Client Name',
      placeholder: '',
      inputType: 'text',
      validators: inputValidator.clientLName.validators,
      responseKey: 'ClientName',
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
      responseKey: 'CodeRequisition',
      validators: inputValidator.demandCodeRequisition.validators,
    },
    startDate: {
      label: 'Start date',
      inputType: 'text',
      placeholder: 'DD/MM/YYYY',
      responseKey: 'StartDate',
      validators: inputValidator.demandStartDate.validators,
    },
    clientID: {
      options: pickerClients,
      label: 'Client',
      inputType: 'dropdown',
      placeholder: 'Select a client',
      responseKey: 'ClientID',
      validators: [{ required: false }],
    },
    originatorName: {
      label: 'Originator',
      inputType: 'text',
      placeholder: '',
      responseKey: 'OriginatorName',
      validators: inputValidator.demandOriginator.validators,
    },
    skillsID: {
      options: pickerSkills,
      label: 'Skill',
      inputType: 'dropdown',
      placeholder: 'Select a skill',
      responseKey: 'SkillsID',
      validators: inputValidator.demandSkill.validators,
    },
    probability: {
      label: 'Probability',
      inputType: 'text',
      placeholder: '',
      responseKey: 'Probability',
      validators: inputValidator.demandProbability.validators,
    },
    grade: {
      options: demand_grade,
      label: 'Grade',
      inputType: 'dropdown',
      placeholder: 'Select a grade',
      responseKey: 'Grade',
      validators: inputValidator.demandGrade.validators,
    },
    selectedApplicant: {
      label: 'Selected Applicant',
      inputType: 'text',
      placeholder: '',
      responseKey: 'SelectedApplicant',
      validators: inputValidator.demandSelectedApplicant.validators,
    },
    status: {
      options: demand_status,
      label: 'Status',
      inputType: 'dropdown',
      placeholder: 'Select a status',
      responseKey: 'Status',
      validators: inputValidator.demandStatus.validators,
    },
    notes: {
      label: 'Notes',
      inputType: 'text',
      placeholder: '',
      responseKey: 'Notes',
      validators: inputValidator.demandNotes.validators,
    },
    proposedApplicant: {
      label: 'Proposed Applicant',
      inputType: 'text',
      placeholder: '',
      responseKey: 'ProposedApplicant',
      validators: inputValidator.demandProposedApplicant.validators,
    },
    creationDate: {
      label: 'Creation date',
      inputType: 'text',
      placeholder: 'DD/MM/YYYY',
      responseKey: 'CreationDate',
      validators: inputValidator.demandCreationDate.validators,
    },
    location: {
      label: 'Location',
      inputType: 'text',
      placeholder: '',
      responseKey: 'Location',
      validators: inputValidator.demandLocation.validators,
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
      responseKey: 'ApplicantFirstName',
    },
    applicantLastName: {
      label: 'Last name',
      placeholder: '',
      inputType: 'text',
      validators: inputValidator.applicantLastName.validators,
      responseKey: 'ApplicantLastName',
    },
    applicantStatus: {
      label: 'Status',
      placeholder: 'Select a status',
      options: pickerStatus,
      inputType: 'dropdown',
      validators: inputValidator.applicantStatus.validators,
      responseKey: 'ApplicantStatus',
    },
    applicantSkills: {
      label: 'Skill',
      placeholder: 'Select a skill',
      options: pickerSkills,
      inputType: 'dropdown',
      validators: inputValidator.applicantSkills.validators,
      responseKey: 'SkillsID',
    },
    applicantNotes: {
      label: 'Notes',
      placeholder: '',
      inputType: 'text',
      validators: inputValidator.applicantNotes.validators,
      responseKey: 'Notes',
    },
    applicantType: {
      label: 'Applicant type',
      placeholder: 'Select type',
      options: pickerType,
      inputType: 'dropdown',
      validators: inputValidator.applicantType.validators,
      responseKey: 'ApplicantType',
    },
    applicantLocation: {
      label: 'Location',
      placeholder: '',
      inputType: 'text',
      validators: inputValidator.applicantLocation.validators,
      responseKey: 'Location',
    },
  }
  return inputDefaults
}

export const lowerCaseKeys = (obj) => {
  let lowerCased = {}

  for (const key in obj) {
    const newKey = key[0].toLowerCase() + key.slice(1)
    lowerCased[newKey] = obj[key]
  }
  return lowerCased
}
