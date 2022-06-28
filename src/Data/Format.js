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
    codeRequisition: { label: 'Code Requisition' },
    startDate: { label: 'Start date' },
    originatorName: { label: 'Originator' },
    probability: { label: 'Probability' },
    selectedApplicant: { label: 'Selected Applicant' },
    notes: { label: 'Notes' },
    proposedApplicant: { label: 'Proposed Applicant' },
    creationDate: { label: 'Creation date' },
    location: { label: 'Location' },
    clientID: { options: pickerClients, label: 'Client', placeholder: 'Select a client' },
    skillsID: { options: pickerSkills, label: 'Skill', placeholder: 'Select a skill' },
    grade: { options: demand_grade, label: 'Grade', placeholder: 'Select a grade' },
    status: { options: demand_status, label: 'Status', placeholder: 'Select a status' },
  }
  return inputDefaults
}
