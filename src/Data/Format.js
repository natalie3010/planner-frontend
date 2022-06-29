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

export const demandFormFormatter = (pickerClients, pickerSkills, demand_grade, demand_status) => {
  const inputDefaults = {
    codeRequisition: { label: 'Code Requisition', responseKey: 'CodeRequisition' },
    startDate: { label: 'Start date', responseKey: 'StartDate' },
    originatorName: { label: 'Originator', responseKey: 'OriginatorName' },
    probability: { label: 'Probability', responseKey: 'Probability' },
    selectedApplicant: { label: 'Selected Applicant', responseKey: 'SelectedApplicant' },
    notes: { label: 'Notes', responseKey: 'Notes' },
    proposedApplicant: { label: 'Proposed Applicant', responseKey: 'ProposedApplicant' },
    creationDate: { label: 'Creation date', responseKey: 'CreationDate' },
    location: { label: 'Location', responseKey: 'Location' },
    clientID: { options: pickerClients, label: 'Client', placeholder: 'Select a client', responseKey: 'ClientID' },
    skillsID: { options: pickerSkills, label: 'Skill', placeholder: 'Select a skill', responseKey: 'SkillsID' },
    grade: { options: demand_grade, label: 'Grade', placeholder: 'Select a grade', responseKey: 'Grade' },
    status: { options: demand_status, label: 'Status', placeholder: 'Select a status', responseKey: 'Status' },
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
